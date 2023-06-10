'use strict'

let motif = {}
let mo = motif
;{
	let mo = motif
	//
	let lih = ru.lihat
	let cla = ru.cla
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
	
	let batasframe = [0,100,500,900,950,1000,1100,1200,]//hlm
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
		akhirhlm()
	},)
	addEventListener('keydown',e=>{
		//lih(e.keyCode)
		if(e.keyCode === 39){//kanan
			if(frame === batasframe[kehlm]){
				kehlm++
				akhirhlm()
			}
			frame = batasframe[kehlm]
		}else if(e.keyCode === 37){//kiri
			frame = batasframe[(kehlm > 0)?--kehlm:kehlm]
		}
	},)
	let akhirhlm = ()=>{
		if(kehlm > batasframe.length-1){
			kehlm = batasframe.length-1
		}
	}
	
	//lihat
	mo.lihat = ()=>
	/*
	[
		frame	,
		kehlm	,
		matcam[4]	,
		matcam[5]	,
		matcam[0]	,
	].map(aa=>aa.toFixed(2))
	*/
	'frame = '+frame+
	' | matcam_x = '+matcam[4]+
	' | matcam_y = '+matcam[5]+
	' | matcam_scale = '+matcam[0]
	
	//obj
	let global//INGAT!! ini jadi objek global
	mo.global = global = bikinobj('global',
		(e,o,dt,)=>{
			let r
			switch(e){
				case 'hitung0':
					m2d.identity(matcam)
					frame += dt/22
					if(frame >= batasframe[kehlm]){
						frame = batasframe[kehlm]
					}
					let x = 0
					let y = 0
					let scale = 1
					switch(kehlm){
						case 0:
						case 1:
							x = 0
							y = -2500+fade((frame-50)/7)*2300
							scale = 1-fade((frame-75)/7)*.4
						break
						case 2:
							//geser
							x = -fade(
								(
									33+frame-batasframe[kehlm]/3//tengah
								)*.4//cepat
							)*333
							
							y = -200+fade(
								frame-batasframe[kehlm]/2
							)+roketnaik()*1.15
							
							scale = 0.6+fade(
								(
									frame-batasframe[kehlm]/2-22
								)/11
							)*1.5
						break
						case 3:
						case 4:
						case 5:
							x = -333
							y = (frame < batasframe[2]+200)?(-4263-warheadnaik()*.9):-9600
							scale = 2.1+fade((frame-batasframe[2]-111)/8)*4
						break
						case 6:
							r = (frame-batasframe[5])/(-batasframe[5]+batasframe[6]) //rasio, 0 sampe 1
							x = -333*(1-8*fade((r-.5)*11))
							y = -9600
							scale = 6.1-5.15*fade((r-.8)*9)
						break
						case 7:
							r = (frame-batasframe[6])/(-batasframe[6]+batasframe[7])
							x = 2331
							y = -9600-fade((r-.5)*5)*999
							scale = 1.1
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
					o.tkotak += dt/22
					o.tkotak *= +(o.tkotak < 222)
					//lih(o.tkotak)
					//kotak
					o.x = Math.min(Math.max(-200,o.tkotak*2-455,),-77,)
					o.y = Math.max(Math.min(0,-o.tkotak+22,),-44,)
				break
				case 'tampil':
					//langit
					cx.fillStyle = o.grd
					cx.fillRect(-1666,0,3333,-2222,)
					
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
					cx.fillText('MOTIVASI',0,-2500,)
					
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
					
					//slide1
					cx.fillStyle = 'black'
					cx.textAlign = 'left'
					cx.font = '22px Consolas'
					let rk = -333//ratakiri
					let ra = -422//rataatas
					let li = 0//line
					let ja = 22//jarak
					cx.fillText	('MOTIVASI ADALAH "DORONGAN YANG BERASAL DARI DALAM '	,rk,++li*ja+ra,)
					//cx.fillText	('DIRI SESEORANG, YANG MEMBANGUNKAN, MENGARAHKAN '	,rk,++li*ja+ra,)
					cx.fillText	('DIRI SESEORANG, YANG '	,rk,++li*ja+ra,)
					cx.fillStyle = 'blue'
					cx.fillText	(''	,rk+55,++li*ja+ra,)
					cx.fillText	('MEMBANGUNKAN'	,rk+55,++li*ja+ra,)
					cx.fillStyle = 'orange'
					cx.fillText	('MENGARAHKAN'	,rk+55,++li*ja+ra,)
					cx.fillStyle = 'purple'
					cx.fillText	('MENGINTEGRASIKAN '	,rk+55,++li*ja+ra,)
					cx.fillStyle = 'black'
					cx.fillText	(''	,rk,++li*ja+ra,)
					cx.fillText	('TINGKAH LAKU SESEORANG PADA SITUASI TERTENTU'	,rk,++li*ja+ra,)
					cx.fillText	('UNTUK MENCAPAI TUJUAN TERTENTU PULA'	,rk,++li*ja+ra,)
					cx.fillText	(''	,rk,++li*ja+ra,)
					
					//slide2
					rk = -1555//ratakiri
					ra = -5000//rataatas
					li = 0//line
					ja = 66//jarak
					cx.font = '55px Consolas'
					cx.fillStyle = ru.rgba(Math.random()*255,255,0,1,)
					cx.fillText	('MOTIF BERSAHABAT'	,rk-111,++li*ja+ra,)
					cx.fillStyle = 'cyan'
					cx.fillText	('MENGUTAMAKAN KEAKRABAN'	,rk,++li*ja+ra,)
					cx.fillText	('SUKA MEMPERHATIKAN ORANG LAIN'	,rk,++li*ja+ra,)
					cx.fillStyle = ru.rgba(Math.random()*255,255,0,1,)
					cx.fillText	('MOTIF BERKUASA'	,rk-111,++li*ja+ra,)
					cx.fillStyle = 'cyan'
					cx.fillText	('INGIN MENGUASAI ORANG LAIN'	,rk,++li*ja+ra,)
					cx.fillText	('TIDAK PEDULI DENGAN PERASAAN ORANG LAIN'	,rk,++li*ja+ra,)
					cx.fillText	('BERUSAHA MENOLONG ORANG LAIN TANPA DIMINTA'	,rk,++li*ja+ra,)
					cx.fillStyle = ru.rgba(Math.random()*255,255,0,1,)
					cx.fillText	('MOTIF BERPRESTASI'	,rk-111,++li*ja+ra,)
					cx.fillStyle = 'cyan'
					cx.fillText	('KURANG MENGHIRAUKAN ORANG LAIN'	,rk,++li*ja+ra,)
					cx.fillText	('LINGKUNGAN DAN KAWAN ADALAH ALAT UNTUK MENCAPAI TUJUAN'	,rk,++li*ja+ra,)
					cx.fillText	('SELALU INGIN MENCAPAI HASIL YANG LEBIH BAIK DAN MERASA PUAS BILA BERPRESTASI'	,rk,++li*ja+ra,)
					cx.fillText	('BERUSAHA MELAKUKAN SESUATU DENGAN CARA YANG KREATIF DAN INOVATIF'	,rk,++li*ja+ra,)
					//cx.fillText	(''	,rk,++li*ja+ra,)
					
					//3 gambar motif
					cx.lineWidth = 44
					//sahaabat
					cx.fillStyle = 'cyan'
					cx.strokeStyle = '#00ffff99'
					cx.save()
						cx.transform(
							.4	,0	,
							0	,.4	,
							-1222	,-4000	,
						)
						cx.fill(o.sahabat)
						cx.stroke(o.sahabat)
					cx.restore()
					//kuasa
					cx.fillStyle = '#00ff00'
					cx.strokeStyle = '#00ff0099'
					cx.save()
						cx.transform(
							.4	,0	,
							0	,.4	,
							-500	,-4111	,
						)
						cx.fill(o.kuasa)
						cx.stroke(o.kuasa)
					cx.restore()
					//prestasi
					cx.fillStyle = '#ffff00'
					cx.strokeStyle = '#ffff0099'
					cx.save()
						cx.transform(
							.4	,0	,
							0	,.4	,
							277	,-4000	,
						)
						cx.fill(o.prestasi)
						cx.stroke(o.prestasi)
					cx.restore()
					if(frame < batasframe[2]+200){
						//planet
						cx.fillStyle = '#555555'
						cx.beginPath()
						cx.ellipse(-333,-9900,333,333,0,0,359.99)
						cx.fill()
					}else
					if(
						(frame >= batasframe[2]+200) &&
						(frame < batasframe[2]+240)
					){
						//getar
						cx.fillStyle = 'yellow'
						cx.beginPath()
						cx.ellipse(
							-333	+Math.random()*77	,
							-9900	+Math.random()*77	,
						333,333,0,0,359.99)
						cx.fill()
					}else
					if(
						(frame >= batasframe[2]+240) &&
						(frame < batasframe[2]+300)
					){
						//meledak
						let r = 5555
						let grd = cx.createRadialGradient(
							-333	,-9900	,55	,
							-333	,-9900	,r	,
						)
						grd.addColorStop(Math.min(
							(frame-batasframe[2]-240)/11
						,1,),'white',)
						grd.addColorStop(1,'#ffff0000',)
						cx.fillStyle = grd
						cx.beginPath()
						cx.ellipse(
							-333	,
							-9900	,
						r,r,0,0,359.99)
						cx.fill()
					}
				break
			}
		},
	)
	jagad.sahabat	= new Path2D(cla('sahabat'	)[0].attributes.d.value)
	jagad.kuasa	= new Path2D(cla('kuasa'	)[0].attributes.d.value)
	jagad.prestasi	= new Path2D(cla('prestasi'	)[0].attributes.d.value)
	jagad.x0 = 0//kotak
	jagad.y0 = 0//kotak
	jagad.tkotak = 0
	jagad.grd = cx.createLinearGradient(0,-888,0,-1555,);
	jagad.grd.addColorStop(0, "cyan");
	jagad.grd.addColorStop(1, "#0000ff00");
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
	
	let galaksi = bikinobj('galaksi',
		(e,o,dt,)=>{
			switch(e){
				case 'tampil':
					if(frame < batasframe[2]+300){break}
					cx.fillStyle = 'white'
					cx.beginPath()
					cx.ellipse(0,0,333,333,0,0,359.99,)
					cx.fill()
				break
			}
		}
	)
	let m = galaksi.matlok
	m2d.translate(m,m,[-333,-9600,],)
	
	let sabukasteroid = bikinobj('sabukasteroid',()=>{},)
	
	let slideC = bikinobj('slideC',
		(e,o,dt,)=>{
			if(frame < batasframe[2]+300){return}
			switch(e){
				case 'hitung0':
					let m = o.matlok
				break
				case 'tampil':
					if(batasframe[6] < frame){
						cx.fillStyle = 'white'
						cx.font = '111px Consolas'
						cx.textAlign = 'center'
						cx.fillText('TERIMA KASIH',0,-999,)
						for(let naA = 0;naA < 7;naA++){
							cx.fillRect(
								0	+mop*(Math.random()-.5)	,
								-999	+mot*(Math.random()-.5)	,
							11,11,)
						}
						return
					}
					//border
					cx.fillStyle = '#000000aa'
					cx.strokeStyle = 'white'
					cx.lineWidth = 5
					cx.fillRect(-mop/2,-mot/2,mop,mot,)
					cx.strokeRect(-mop/2,-mot/2,mop,mot,)
					
					cx.fillStyle = '#aaaaff'
					cx.font = '44px Consolas'
					cx.textAlign = 'center'
					cx.fillText('MOTIVE BERPRESTASI',0,-333,)
					cx.font = '33px Consolas'
					cx.fillText('(Achievement Motive)',0,-333+55,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.textAlign = 'left'
					let y = -222
					cx.fillText('1. MENYAINGI, MENYAMAI, MENGATASI, BAHKAN MELEBIHI HASIL KARYA ORANG LAIN '	,-mop/2+55,y += 33,)
					cx.fillText('   YANG LEBIH BAIK'	,-mop/2+55,y += 33,)
					cx.fillText('2. MENYAINGI, MEMENUHI MELEBIHI UKURAN HASIL KARYA SENDIRI SEBELUMNYA'	,-mop/2+55,y += 33,)
					cx.fillText('3. MELAKUKAN SESUATU YANG BERSIFAT KHAS LAIN DARI YANG LAIN SECARA KREATIF '	,-mop/2+55,y += 33,)
					cx.fillText('   DAN INOVATIF'	,-mop/2+55,y += 33,)
					cx.fillText('4. GIAT BERSIBUK DIRI DENGAN USAHA-USAHA UNTUK MENCAPAI TUJUAN JANGKA '	,-mop/2+55,y += 33,)
					cx.fillText('   PANJANG'	,-mop/2+55,y += 33,)
					y += 33
					cx.fillStyle = '#aaaaff'
					cx.font = '33px Consolas'
					cx.fillText('PERBUATAN/TINGKAH LAKU'	,-mop/2+55,y += 33,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.fillText('1. BERTANGGUNG JAWAB SECARA PRIBADI ATAS SEGALA PERBUATAN'	,-mop/2+55,y += 33,)
					cx.fillText('2. MEMPERHITUNGKAN DAN MENGAMBIL RESIKO SEDANG/WAJAR'	,-mop/2+55,y += 33,)
					cx.fillText('3. MELAKUKAN SEGALA SESUATU SECARA KREATIF DAN INOVATIF'	,-mop/2+55,y += 33,)
					
					cx.beginPath()
					cx.save()
						cx.transform(.2,0,0,.2,-mop/2+33,-mot/2+33,)
						cx.fillStyle = '#aaaaff'
						cx.fill(jagad.prestasi)
					cx.restore()
				break
			}
		},
	)
	m = slideC.matlok
	m2d.translate(m,matide,[
		-333*-7	,
		-9600-1234*0	,
	],)
	let slideB = bikinobj('slideB',
		(e,o,dt,)=>{
			if(frame < batasframe[2]+390){return}
			if(batasframe[5]+10 < frame){return}
			switch(e){
				case 'hitung0':
					let m = o.matlok
					let pindah = +(frame < batasframe[4]+40)
					m2d.translate(m,matide,[
						-333	,
						-9600-1234*pindah*.5	,
					],)
					let s = pindah?1:5.5
					m2d.scale(m,m,[s,s,],)
				break
				case 'tampil':
					if(
						(frame < batasframe[3]) || (
							(batasframe[4]+30 < frame) &&
							(frame < batasframe[5])
						) || (batasframe[5] < frame)
					){
						cx.fillStyle = ru.rgba(
							Math.random()*255	,
							Math.random()*255	,
							Math.random()*255	,
							1	,
						)
						cx.fillRect(-mop/2,-mot/2,mop,mot,)
						break
					}
					//border
					cx.fillStyle = '#000000aa'
					cx.strokeStyle = 'white'
					cx.lineWidth = 5
					cx.fillRect(-mop/2,-mot/2,mop,mot,)
					cx.strokeRect(-mop/2,-mot/2,mop,mot,)
					
					cx.fillStyle = '#ff9999'
					cx.font = '44px Consolas'
					cx.textAlign = 'center'
					cx.fillText('MOTIVE KUASA',0,-333,)
					cx.font = '33px Consolas'
					cx.fillText('(Power Motive)',0,-333+55,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.textAlign = 'left'
					let y = -222
					cx.fillText('1. MEMPENGARUHI ORANG LAIN, BAIK SECARA KERAS MAUPUN LEMBUT'	,-mop/2+55,y += 33,)
					cx.fillText('2. MEMBERIKAN PERTOLONGAN TANPA DIMINTA'	,-mop/2+55,y += 33,)
					cx.fillText('3. MENGATUR TINGKAH LAKU DAN KEHIDUPAN ORANG LAIN'	,-mop/2+55,y += 33,)
					cx.fillText('4. MEMBUAT ORANG LAIN MENJADI TERKESAN'	,-mop/2+55,y += 33,)
					cx.fillText('5. MERISAUKAN KEDUDUKAN/REPUTASI ORANG LAIN'	,-mop/2+55,y += 33,)
					y += 33
					cx.fillStyle = '#ff9999'
					cx.font = '33px Consolas'
					cx.fillText('PERBUATAN/TINGKAH LAKU'	,-mop/2+55,y += 33,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.fillText('1. AKTIF MENJALANKAN POLITIK/ORGANISASI'	,-mop/2+55,y += 33,)
					cx.fillText('2. PEKA TERHADAP PENGARUH ANTAR PRIBADI DALAM KELOMPOK'	,-mop/2+55,y += 33,)
					cx.fillText('3. MENGOLEKSI BENDA-BENDA BERGENGSI'	,-mop/2+55,y += 33,)
					cx.fillText('4. MEMASUKI ORGANISASI BERGENGSI'	,-mop/2+55,y += 33,)
					cx.fillText('5. MEMBANTU TANPA DIMINTA'	,-mop/2+55,y += 33,)
					
					cx.beginPath()
					cx.save()
						cx.transform(.2,0,0,.2,-mop/2+33,-mot/2+33,)
						cx.fillStyle = '#ff9999'
						cx.fill(jagad.kuasa)
					cx.restore()
				break
			}
		},
	)
	let slideA = bikinobj('slideA',
		(e,o,dt,)=>{
			if(frame < batasframe[2]+300){return}
			if(frame > batasframe[4]+40){return}
			switch(e){
				case 'hitung0':
					let m = o.matlok
					if(kehlm < 5){
						//m2d.translate(m,matide,[-333*9	,-9600-1234	,],)
						//m2d.translate(m,matide,[-333,-9600,],)
						m2d.translate(m,matide,[
							-333	*((-8*	(frame-batasframe[4]))/(-batasframe[3]+batasframe[4])+1	)	,
							-9600-1234	*((-	(frame-batasframe[4]))/(-batasframe[3]+batasframe[4])	)	,
						],)
						let s = ((4.5*(frame-batasframe[4]))/(-batasframe[3]+batasframe[4]))+5.5
						//m2d.scale(m,m,[5.5,5.5,],)
						m2d.scale(m,m,[s,s,],)
					}else{
						m2d.translate(m,matide,[
							-333	,
							-9600+(frame-batasframe[4])*155,
						],)//sampe sini, bikin slideb
						m2d.scale(m,m,[5.5,5.5,],)
					}
				break
				case 'tampil':
					//border
					cx.fillStyle = '#000000aa'
					cx.strokeStyle = 'white'
					cx.lineWidth = 5
					cx.fillRect(-mop/2,-mot/2,mop,mot,)
					cx.strokeRect(-mop/2,-mot/2,mop,mot,)
					
					cx.fillStyle = '#00ff00'
					cx.font = '44px Consolas'
					cx.textAlign = 'center'
					cx.fillText('MOTIVE BERSAHABAT',0,-333,)
					cx.font = '33px Consolas'
					cx.fillText('(Affiliation Motive)',0,-333+55,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.textAlign = 'left'
					let y = -222
					cx.fillText('1. MENGADAKAN, MEMPERBAIKI ATAU MEMELIHARA TATA HUBUNGAN YANG ERAT,'	,-mop/2+55,y += 33,)
					cx.fillText('   HANGAT DAN BERSAHABAT'	,-mop/2+55,y += 33,)
					cx.fillText('2. MERISAUKAN PERPISAHAN DENGAN ORANG (Orang-orang) LAIN'	,-mop/2+55,y += 33,)
					cx.fillText('3. MERINDUKAN PERTEMUAN DENGAN DENGAN ORANG (Orang-orang) LAIN'	,-mop/2+55,y += 33,)
					cx.fillText('4. MENYUKAI KEGIATAN PERSAHABATAN'	,-mop/2+55,y += 33,)
					y += 33
					cx.fillStyle = '#00ff00'
					cx.font = '33px Consolas'
					cx.fillText('PERBUATAN/TINGKAH LAKU'	,-mop/2+55,y += 33,)
					cx.fillStyle = 'white'
					cx.font = '28px Consolas'
					cx.fillText('1. LEBIH SUKA BERSAMA "ORANG LAIN"'	,-mop/2+55,y += 33,)
					cx.fillText('2. SERING BERGAUL DENGAN "ORANG LAIN"'	,-mop/2+55,y += 33,)
					cx.fillText('3. LEBIH MEMENTINGKAN "HUBUNGAN ANTAR PRIBADI" DARIPADA "HUBUNGAN"'	,-mop/2+55,y += 33,)
					cx.fillText('   PEKERJAAN / KEDINASAN"'	,-mop/2+55,y += 33,)
					cx.fillText('4. LEBIH MENYUKAI KERJA BERSAMA-SAMA DITENGAH ORANG LAIN'	,-mop/2+55,y += 33,)
					
					cx.beginPath()
					cx.save()
						cx.transform(.2,0,0,.2,-mop/2+33,-mot/2+33,)
						cx.fillStyle = '#00ff00'
						cx.fill(jagad.sahabat)
					cx.restore()
				break
			}
		},
	)
	
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
	
	let roket = bikinobj('roket',
		(e,o,dt,)=>{
			switch(e){
				case 'hitung0':
					let m = o.matlok
					m[5] = roketnaik()
				break
				case 'tampil':
					cx.fillStyle = 'white'
					cx.strokeStyle = 'grey'
					cx.lineWidth = 2
					cx.fillRect	(-15	,0	,30	,-144	,)
					cx.strokeRect	(-15	,0	,30	,-144	,)
					cx.fillStyle = 'blue'
					//api
					if(
						(batasframe[1] < frame) &&
						(frame < batasframe[2])
					){
						api(0,6,)
					}
				break
			}
		},
	)
	m = roket.matlok
	m2d.translate(m,m,[-333,0,],)
	
	let warhead = bikinobj('warhead',
		(e,o,dt,)=>{
			if(frame >= batasframe[2]+200){return}
			switch(e){
				case 'hitung0':
					let m = o.matlok
					m[4] = -333
					if(kehlm < 3){
						m[5] = -144+roketnaik()
					}else{
						m[5] = -3678-warheadnaik()
					}
				break
				case 'tampil':
					//frame 700 --> meledak
					cx.fillStyle = 'white'
					cx.strokeStyle = 'grey'
					cx.lineWidth = 2
					cx.fill(o.segi3)
					cx.stroke(o.segi3)
					if(kehlm !== 3){break}
					api(0,6,)
				break
			}
		},
	)
	m = warhead.matlok
	warhead.segi3 = new Path2D()
	p = warhead.segi3
	p.moveTo(-15	,0	,)
	p.lineTo(-4	,-55	,)
	p.lineTo(4	,-55	,)
	p.lineTo(15	,0	,)
	p.closePath()
	
	let flashabng = bikinobj('flashabng',
		(e,o,dt,)=>{
			switch(e){
				case 'tampil':
					if(frame < batasframe[2]+300){break}
					let r = 5555
					cx.fillStyle = ru.rgba(255,255,255,
						(-frame+batasframe[2]+300)/
						(batasframe[3]-batasframe[2]-300)*
						1.5
					+1,)
					//(-frame+800)/100+1
					cx.beginPath()
					cx.ellipse(
						-333	,
						-9900	,
					r,r,0,0,359.99)
					cx.fill()
				break
			}
		},
	)
	
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
			chi(jagad,galaksi,)
				chi(galaksi,sabukasteroid,)
			chi(jagad,slideC,)
			chi(jagad,slideB,)
			chi(jagad,slideA,)
			chi(jagad,panah,)
			chi(jagad,roket,)
			chi(jagad,warhead,)
			chi(jagad,flashabng,)
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
	let unik = 0
	for(let naA = 0;naA < 11;naA++){
		let titik = bikinobj('titik '+unik++,ftitik,)
		chi(jagad,titik,)
		titik.arah = v2.create()
		let m = titik.matlok
		m2d.translate(m,m,titik_target,)
	}
	let batasangka = (bawah,nilai,atas,)=>Math.max(bawah,Math.min(nilai,atas,),)
	let fade = x=>Math.tanh(x)/2+.5
	let roketnaik = ()=> 12*(
		-hyp(frame-batasframe[1]-60,5,)+
		hyp(frame-batasframe[2]+45,5,)
	)
	let warheadnaik = ()=>hyp((frame-batasframe[2]-22)*33,77,)
	let sinargrd = cx.createRadialGradient(0,33,0,0,33,555,)
	sinargrd.addColorStop(0, "#ffffff99");
	sinargrd.addColorStop(1, "#ffff0000");
	let api = (x,y,)=>{
		cx.fillStyle = '#ff990099'
		cabangapi(x,y+55,)
		cx.fillStyle = 'yellow'
		cabangapi(x,y,)
		//sinar
		cx.fillStyle = sinargrd
		cx.beginPath()
		cx.ellipse(0,33,555,555,0,0,359.99,)
		cx.fill()
	}
	let cabangapi = (x,y,)=>{
		cx.beginPath()
		cx.moveTo(-16	+x,0	+y+0	,)
		cx.lineTo(-16	+x,33	+y+Math.random()*111	,)
		cx.lineTo(-11	+x,22	+y+Math.random()*111	,)
		cx.lineTo(-11	+x,88	+y+Math.random()*111	,)
		cx.lineTo(-4	+x,77	+y+Math.random()*111	,)
		cx.lineTo(0	+x,111	+y+Math.random()*111	,)// =======
		cx.lineTo(4	+x,77	+y+Math.random()*111	,)
		cx.lineTo(11	+x,88	+y+Math.random()*111	,)
		cx.lineTo(11	+x,22	+y+Math.random()*111	,)
		cx.lineTo(16	+x,33	+y+Math.random()*111	,)
		cx.lineTo(16	+x,0	+y+0	,)
		cx.fill()
	}
	let hyp = (x,n,)=>(//hyperbola
		(
			x	**2+
			(2*n)	**2
		)**.5+x
	)*.5
	
	mo.lihatobj = (o,tab = '\t',)=>{
		o = o || global
		lih(tab+o.nama)
		for(let vaA of o.children){
			mo.lihatobj(vaA,tab+'|\t')
		}
	}
	
	let fasteroid = (e,o,dt,)=>{
		if(frame < batasframe[2]+300){return}
		switch(e){
			case 'hitung0':
				let m = o.matlok
				if(o.x > 5111){
					o.x = -5111
					o.s = Math.random()**2*4+.3
				}
				m2d.translate(m,matide,[
					o.x += o.s*4	,
					-111-o.x/7+o.s*333-mousey*o.s*.3	,
				],)
				m2d.rotate(m,m,(o.r += -.04*Math.random())+mousex/77,)
				m2d.scale(m,m,[o.s,o.s,],)
			break
			case 'tampil':
				let cerah = (3-o.s*.7)*.6
				cx.fillStyle = ru.rgba(
					255	,
					255	,
					22	,
					cerah	,
				)
				cx.fillRect(-44,-44,88,88,)
			break
		}
	}
	for(let naA = 0;naA<111;naA++){
		let asteroid = bikinobj('asteroid'+naA,fasteroid,)
		chi(sabukasteroid,asteroid,)
		asteroid.x = -11111*(Math.random()-.5)
		asteroid.r = 0
		asteroid.s = Math.random()**2*4+.3//scale
	}
	let mousex = 0
	let mousey = 0
	addEventListener('mousemove',e=>{
		mousex = e.x
		mousey = e.y
	},)
	
	alert(`
Klik untuk lanjutkan animasi
Keyboard kanan kiri untuk pindah slide tanpa animasi
`	)
	
	requestAnimationFrame(lukis)
}