(function() {

	window.addEventListener("load", function() {

		var preloader = {
			art: [
				"./img/art/burrito-project-logo-2048-black-05-c.png",
				"./img/art/doughnut-slice-c.png",
				"./img/art/tlg-turtle-links-2d-01-c.png",
				"./img/art/tlg-turtle-links-3d-01-c.png",
				"./img/art/drawing-concepts-01-c.jpg",
				"./img/art/drawing-concepts-02-c.jpg",
				"./img/art/painting-ddom-01-c.jpg",
				"./img/art/logo-live-360-sheet-main-c.jpg",
				"./img/art/logo-exercises-01-c.png",
				"./img/art/drawing-minion-med-c.jpg"
			],
			projects: [
				"./img/projects/art-designer-01-c.png",
				"./img/projects/art-designer-02-c.png",
				"./img/projects/art-designer-03-c.png",
				"./img/projects/art-designer-04-c.png",
				"./img/projects/art-designer-05-c.png",
				"./img/projects/art-designer-06-c.png",
				"./img/projects/art-designer-07-c.png",
				"./img/projects/art-designer-08-c.png",
				"./img/projects/art-designer-09-c.png",
				"./img/projects/bunker-blast-slide-01.jpg",
				"./img/projects/bunker-blast-slide-02.jpg",
				"./img/projects/bunker-blast-slide-03.jpg",
				"./img/projects/bunker-blast-slide-04.jpg",
				"./img/projects/bunker-blast-slide-05.jpg",
				"./img/projects/experience-download-page-c.png",
				"./img/projects/m-styleguide-01-c.png",
				"./img/projects/m-styleguide-02-c.png",
				"./img/projects/m-styleguide-03-c.png",
				"./img/projects/m-styleguide-04-c.png",
				"./img/projects/m-styleguide-05-c.png",
				"./img/projects/bonkr-logo-c.png",
				"./img/projects/bonkr-screen-01-c.png",
				"./img/projects/bonkr-screen-02-c.png",
				"./img/projects/bonkr-screen-03-c.png",
				"./img/projects/web-session-scheduling-02.png",
				"./img/projects/web-session-scheduling-03.png",
				"./img/projects/site-ian-haney-lopez-c.jpg",
				"./img/projects/site-start-page-01-c.png",
				"./img/projects/frankrohter-screen-01-c.png",
				"./img/projects/frankrohter-screen-02-c.png",
				"./img/projects/logo-clpsm-01.png",
				"./img/projects/clpsm-rec.gif",
				"./img/projects/site-thalia-01-c.png",
				"./img/projects/email-the-grove-01-c.png"
			],
			delay: 9000,
			load: function() {
				for (var i=0; i < this.art.length; i++) {
					var imgD = new Image()
					imgD.src = this.art[i]
				}
				for (var j=0; j < this.projects.length; j++) {
					var imgI = new Image()
					imgI.src = this.projects[j]
				}
			}
		}
		
		var param = location.href.split("?")[1]
		if (param !== "nopl") {
			setTimeout(function() {
				preloader.load()
				console.log("pre-loading sub-page images complete")
			},preloader.delay)
		} else {
			console.log("param 'nopl' detected. subpage images will no preload")
		}
	})

})()