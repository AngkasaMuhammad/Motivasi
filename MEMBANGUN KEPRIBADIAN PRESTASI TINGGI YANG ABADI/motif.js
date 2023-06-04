'use strict'

let motif = {}
let mo = motif
;{
	let mo = motif
	//
	let lih = ru.lihat
	let canv = mo.canv = document.createElement('canvas')
	document.body.appendChild(canv)
	let mop = mo.panjang = canv.width = 1000*1.3
	let mot = mo.tinggi = canv.height = 600*1.3
	let cx = mo.cx = canv.getContext('2d',{willReadFrequently:true,},)
	cx.msImageSmoothingEnablmo = false;
	cx.mozImageSmoothingEnablmo = false;
	cx.webkitImageSmoothingEnablmo = false;
	cx.imageSmoothingEnablmo = false;
	cx.imageSmoothingEnablmo = false
	
	let m2d = glMatrix.mat2d
	let v2 = glMatrix.vec2
	let matide = m2d.create()//identity
	let mattengah = m2d.create()
	let mathasil = m2d.create()
	let matcam = m2d.create()
	let whmax = 2222
	let ttadi = 0
	
	let batasframe = [0,222,888,]//hlm
	let frame = 0
	let kehlm = 0
	
	let lukis = now=>{
		requestAnimationFrame(lukis)
		let dt = now-ttadi
		ttadi = now
		
		mo.canv.width = Math.max(
			mop,
			Math.min(
				innerWidth*mo.tinggi/innerHeight	,
				whmax	,
			),
		)
		mo.canv.height = Math.max(
			mot,
			Math.min(
				innerHeight*mo.panjang/innerWidth	,
				whmax	,
			),
		)
		
		m2d.translate(mattengah,matide,[
			canv.width/2	,
			canv.height/2	,
		],)
		ru.habisarr(arr_obj)
		arr_obj.push(global)
		for(let naA = 0;naA<arr_obj.length;naA++){
			let vaA = arr_obj[naA]
			for(let naB in vaA.children){
				let vaB = vaA.children[naB = +naB]
				vaB.parent = vaA
				arr_obj.splice(naA+naB+1,0,vaB,)
			}
		}
		
		for(let naA = arr_obj.length-1;naA>=0;naA--){
			let vaA = arr_obj[naA]
		}
		for(let vaA of arr_obj){
			cx.save()
				vaA.feve('hitung0',vaA,dt,)
				hitungmat(vaA)
			cx.restore()
		}
		for(let vaA of arr_obj){
			cx.save()
				m2d.mul(mathasil,mattengah,vaA.matglo,)
				cx.setTransform(...mathasil)
				vaA.feve('tampil',vaA,dt,)
			cx.restore()
		}
	}
	let arr_obj = []
	let bikinobj = (nama,feve,)=>{
		let o = {}
		
		o.nama = nama
		o.feve = feve
		o.matlok = m2d.create()
		o.matglo = m2d.create()
		o.parent = null
		o.children = []
		
		return o
	}
	let hitungmat = o=>{
		o.parent?
			m2d.mul(o.matglo,o.parent.matglo,o.matlok,)
		:
			m2d.copy(o.matglo,o.matlok,)
		
	}
	addEventListener('click',e=>{
		if(frame !== batasframe[kehlm]){return}
		kehlm++
	},)
	addEventListener('keydown',e=>{
		//lih(e.keyCode)
		if(e.keyCode === 39){//kanan
			if(frame === batasframe[kehlm]){
				kehlm++
			}
			frame = batasframe[kehlm]
		}else if(e.keyCode === 37){//kiri
			frame = batasframe[(kehlm > 0)?--kehlm:kehlm]
		}
	},)
	
	//lihat
	mo.lihat = ()=>[frame,kehlm,matcam[4],matcam[5],]
	
	//obj
	let global//INGAT!! ini jadi objek global
	mo.global = global = bikinobj('global',
		(e,o,dt,)=>{
			switch(e){
				case 'hitung0':
					m2d.identity(matcam)
					if(frame < batasframe[kehlm]){
						frame += dt/22
					}else{
						frame = batasframe[kehlm]
					}
					let x
					let y
					let scale
					switch(kehlm){
						case 0:
						case 1:
							let fini = -22+frame/4
							x = 0
							y = -1411+Math.atan(fini)*777
							scale = .9-Math.atan(frame*.7-99)/5
							//lih(y)
						break
					}
					m2d.translate(matcam,matcam,[x,y,],)
					m2d.scale(matcam,matcam,[scale,scale,],)
					m2d.invert(o.matlok,matcam,)
				break
			}
		},
	)
	
	let jagad = bikinobj('jagad',
		(e,o,dt,)=>{
			switch(e){
				case 'hitung0':
					o.t += dt/22
					o.t *= +(o.t < 222)
					//lih(o.t)
					//kotak
					o.x = Math.min(Math.max(-200,o.t*2-455,),-77,)
					o.y = Math.max(Math.min(0,-o.t+22,),-44,)
				break
				case 'tampil':
					//langit
					cx.fillStyle = o.grd
					cx.fillRect(-999,0,2222,-1111,)
					
					//bintang
					for(let vaA of o.bintang){
						cx.fillStyle = ru.rgba(
							Math.random()*255	,
							Math.random()*255	,
							Math.random()*255	,
							255	,
						)
						cx.fillRect(
							vaA[0]	,
							vaA[1]	,
							4	,
							4	,
						)
					}
					cx.fillStyle = ru.rgba(
						Math.random()*100+155	,
						Math.random()*100+155	,
						Math.random()*100+155	,
						255	,
					)
					cx.textAlign = 'center'
					cx.font = '99px Consolas'
					cx.fillText('MOTIVASI',0,-2596,)
					
					//tanah
					cx.fillStyle = 'grey'
					cx.fillRect(-999,0,2222,333,)
					
					//crane
					cx.strokeStyle = 'black'
					cx.lineWidth = 4
					cx.stroke(o.crane)
					
					//kotak
					cx.fillStyle = 'blue'
					cx.fillRect(o.x,o.y,22,-33,)
					
					//ke arah
					cx.fillStyle = 'red'
					cx.font = '44px Consolas'
					cx.fillText('A',88,-155,)
					cx.fillText('B',133,-100,)
					cx.fillText('C',144,-33,)
					
					//integrate
					cx.fillStyle = '#550055'
					cx.ellipse(Math.random()*5+titik_target[0],Math.random()*5+titik_target[1],22,22,0,0,359.99,)
					cx.fill()
					
					//tex
					cx.fillStyle = 'black'
					cx.textAlign = 'left'
					cx.font = '22px Consolas'
					let rk = -333//ratakiri
					let ra = -400//rataatas
					let li = 0//line
					let ja = 22//jarak
					//==================================================
					cx.fillText	('MOTIVASI ADALAH "DORONGAN YANG BERASAL DARI DALAM '	,rk,++li*ja+ra,)
					//cx.fillText	('DIRI SESEORANG, YANG MEMBANGUNKAN, MENGARAHKAN '	,rk,++li*ja+ra,)
					cx.fillText	('DIRI SESEORANG, YANG '	,rk,++li*ja+ra,)
					cx.fillStyle = 'blue'
					cx.fillText	('MEMBANGUNKAN'	,rk,++li*ja+ra,)
					cx.fillStyle = 'orange'
					cx.fillText	('MENGARAHKAN'	,rk,++li*ja+ra,)
					cx.fillStyle = 'purple'
					cx.fillText	('MENGINTEGRASIKAN '	,rk,++li*ja+ra,)
					cx.fillStyle = 'black'
					cx.fillText	('TINGKAH LAKU SESEORANG PADA SITUASI TERTENTU'	,rk,++li*ja+ra,)
					cx.fillText	('UNTUK MENCAPAI TUJUAN TERTENTU PULA'	,rk,++li*ja+ra,)
					cx.fillText	(''	,rk,++li*ja+ra,)
				break
			}
		},
	)
	jagad.x0 = 0//kotak
	jagad.y0 = 0//kotak
	jagad.t = 0
	jagad.grd = cx.createLinearGradient(0,-888,0,-1111,);
	jagad.grd.addColorStop(0, "cyan");
	jagad.grd.addColorStop(1, "#0000ffaa");
	jagad.bintang = []
	for(let naA = 0;naA < 133; naA++){
		jagad.bintang.push([
			Math.random()*1222-622	,
			Math.random()*2222-3333	,
		])
	}
	let p = jagad.crane = new Path2D()
	p.rect(-144,0,11,-88,)
	p.moveTo(-222,-99,)
	p.lineTo(-99,-88,)
	p.lineTo(-133,-105,)
	p.closePath()
	
	let panah = bikinobj('panah',
		(e,o,dt,)=>{
			switch(e){
				case 'hitung0':
					o.t += dt/22
					o.t *= +(o.t < 66*2)
					let m = o.matlok
					m2d.translate(m,matide,[-33,-44,],)
					m2d.rotate(m,m,(Math.floor(o.t/44)+2)/2*Math.PI/4)
				break
				case 'tampil':
					cx.fillStyle = 'orange'
					cx.fill(o.panah)
					
					//kotak kecil
					cx.fillStyle = 'green'
					cx.fillRect(-6,(-o.t%44)*4,12,-11,)
					//sampe sini, membangun,mengarahkan,integrasikan
				break
			}
		},
	)
	panah.t = 0
	p = panah.panah = new Path2D()
	p.moveTo(-11,0,)
	p.lineTo(-11,-22,)
	p.lineTo(-22,-22,)
	p.lineTo(0,-44,)
	p.lineTo(22,-22,)
	p.lineTo(11,-22,)
	p.lineTo(11,0,)
	p.closePath()
	
	let UI = bikinobj('UI',
		(e,o,dt,)=>{
			switch(e){
				case 'hitung0':
					let m = o.matlok
					m2d.copy(m,matcam,)
				break
			}
		},
	)
	
	let border = bikinobj('border',(e,o,dt,)=>{
		switch(e){
			case 'tampil':
				cx.fillStyle = '#00ff00'
				cx.strokeStyle = '#ffff00ff'
				cx.lineWidth = 3
				cx.font = '22px Consolas'
				cx.strokeRect(-mop/2,-mot/2,mop,mot,)
			break
		}
	},)
	
	//children, yang atas = muncul di belakang
	let chi = (par,chi,)=>par.children.push(chi)
		chi(global,jagad,)
			chi(jagad,panah,)
		chi(global,UI,)
			chi(UI,border,)
	
	//lainlain
	let ftitik = (e,o,dt,)=>{
		switch(e){
			case 'hitung0':
				let m = o.matlok
				let v = o.arah
				v2.set(v,m[4],m[5],)
				if(v2.dist(v,titik_target,) < 11){
					v2.set(v,
						m[4] = titik_target[0]+(Math.random()-.5)*222	,
						m[5] = titik_target[1]+(Math.random()-.5)*222	,
					)
				}
				v2.sub(v,titik_target,v,)
				v2.normalize(v,v,)
				v[0] *= Math.min(dt/11,11,)
				v[1] *= Math.min(dt/11,11,)
				m2d.translate(m,m,v,)
			break
			case 'tampil':
				cx.fillStyle = 'black'
				cx.fillRect(0,0,4,4,)
			break
		}
	}
	let titik_target = v2.fromValues(244,-144,)
	for(let naA = 0;naA < 11;naA++){
		let titik = bikinobj('titik',ftitik,)
		chi(jagad,titik,)
		titik.arah = v2.create()
		let m = titik.matlok
		m2d.translate(m,m,titik_target,)
	}
	
	requestAnimationFrame(lukis)
}