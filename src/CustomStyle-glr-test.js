import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import MersenneTwister from 'mersenne-twister';
import { Surface } from 'gl-react-dom';
import useAnimationFrame from 'use-animation-frame';


/*
Create your Custom style to be turned into a EthBlock.art Mother NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write gl-react code, comsuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?

 - check out https://gl-react-cookbook.surge.sh/ for examples!
*/

export const styleMetadata = {
  name: '',
  description: '',
  image: '',
  creator_name: '',
  options: {
    mod1: 0.5,
    mod2: 0.5,
    color1: '#fff000',
  },
};

const shaders = Shaders.create({
  main: {
    frag: GLSL`


precision highp float;

	#define thresh 20.
	#define stop 200

	vec3 rgb(float a){
	    a *=8.;
	    return(cos(4.+a+vec3(0.,2.,4.)*.7)*.5+.5);
	}

	vec2 cmul(vec2 a, vec2 b){
	    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
	}

	vec2 cdiv(vec2 v1, vec2 v2){
	    float a = (v1.x*v2.x+v1.y*v2.y)/(v2.x*v2.x+v2.y*v2.y);
	    float b = (v1.y*v2.x-v1.x*v2.y)/(v2.x*v2.x+v2.y*v2.y);
	    return vec2(a,b);
	}

	vec2 cexp(vec2 z){
	    return exp(z.x)*vec2(cos(z.y),sin(z.y));
	}

	vec2 clog(vec2 z){
	    return vec2(log(length(z)),atan(z.y,z.x));
	}

	vec2 cpow(vec2 z, float c){
	    return cexp(c*clog(z));
	}


	vec2 clerp(vec2 a, vec2 b, float m){
	    m = clamp(m,0.,1.);
	    return cmul(vec2(1.-m),a)+cmul(vec2(m),b);
	}


	vec2 rot(vec2 v, float t){
	    float a = (1.*atan(v.x,v.y))+t;
	    return vec2(cos(a),sin(a))*length(v);
	}



//varying vec2 uv;
uniform vec2 res;
uniform float time;
uniform float mod1;
uniform float mod2;
uniform float seed;

void main() {
	vec2 uv = (2.*gl_FragCoord.xy-res.xy)/res.y;
	float f = dot(uv*(1.+mod1),uv+sin(time));
	vec3 c = vec3(f);

	gl_FragColor = vec4(c, 1.0);
}
  `,
  },
});

const u = {
	time: 0
}



const CustomStyle = React.memo(({ block, attributesRef, width, height, mod1, mod2 }) => {
	useAttributes(attributesRef);
	console.log('hi')
	const { hash } = block;
	const nodeRef = useRef();

	useEffect(()=>{
		window.setInterval(()=>{
			u.time+= .01;
			nodeRef.current.props.uniforms.time = u.time;
			nodeRef.current.redraw();
		},30);

	},[]);

	useEffect(()=>{
		nodeRef.current.props.uniforms.mod1 = mod1;
	},[mod1]);

  return useMemo(() => {
	  return (
	    <Node
	      shader={shaders.main}
	      uniforms={{
	      	time: u.time,
	        mod1: mod1,
	        res: [width, height],
	      }}
	       ref={nodeRef}
	    />
	  );
	}, []);
});

function useAttributes(ref) {
  useEffect(() => {
    ref.current = () => {
      return {
        attributes: [
          {
            trait_type: 'your trait here text',
            value: 'replace me',
          },
        ],
      };
    };
  }, [ref]);
}

const Outer = function ({ width, height, innerCanvasRef, ...props }) {
  return (
    <Surface width={width} height={height} ref={innerCanvasRef}>
      <CustomStyle width={width} height={height} {...props} />
    </Surface>
  );
};

export default Outer;
