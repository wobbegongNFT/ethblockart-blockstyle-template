const fs = /*glsl*/ `#version 300 es

	precision mediump float;

	in vec2 v_texcoord;

	uniform mediump sampler2D u_sampler;
	uniform mediump sampler2D u_sampler2;

	uniform float u_time;
	uniform vec2 u_resolution;
	uniform vec2 u_mouse;

	uniform float idx;
	uniform float idx2;
	uniform float texmix;
	uniform float zoom;
	uniform float offs;

	out vec4 fragColor;

	vec2 offset(float offs, vec2 coef){
		return vec2(cos(offs*coef.x), sin(offs*coef.y));
	}

	void main(){

		vec2 uv = vec2(1.,-1.)*gl_FragCoord.xy/u_resolution.xy;

		// vec2 tuv = vec2(1.,-1.)*gl_FragCoord.xy/u_resolution.xy;
		vec2 tuv = v_texcoord;
		float r = u_resolution.y/u_resolution.x;
		// r=1.;
		tuv.x /=r;
		tuv *=(1.-zoom);
		tuv +=.5*zoom;
		tuv.x += 1.-r;
		tuv.y -= (1.-r)*.4;

		vec2 offs1 = offset(offs, vec2(9., 14.));
		vec2 offs2 = offset(offs, vec2(12., 7.));

		vec3 cta = texture(u_sampler, tuv+offs1).xyz;
		vec3 ctb = texture(u_sampler2, tuv+offs2).xyz;
		vec3 cc = mix(cta, ctb, texmix);

		fragColor = vec4(1.-cc, 1.0);

	}`;

	export default fs;
