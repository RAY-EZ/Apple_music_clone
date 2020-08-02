let canvas = document.getElementById('main');
    let width = canvas.width = innerWidth;
    let height = canvas.height = innerHeight- 48;
    let ctx = canvas.getContext('2d');
    let pixelRatio = (window.devicePixelRatio >1)? 2:1;
        
        let x = Math.random() * width;
        let y = Math.random() * height;
        let velX = 3;
        let velY = 3;
        let maxRadii = 1200;

        const COLORS = [
            {r:229, g:50, b:130},
            {r: 231, g: 112, b:68 },
            {r: 245, g: 222, b:214 },
            {r: 163, g: 190, b: 216},
            {r: 47, g: 89, b: 167},
            {r: 24, g: 57, b: 141}
        ];

        let colorC =0;
        function random(min, max) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
          } 

        function Circle(x,y,Velx,Vely,radius,rgb){
            this.X= x;
            this.Y= y;
            this.VelX = Velx;
            this.VelY = Vely;
            this.Radius= radius;
            this.RGB = rgb;
        }
        Circle.prototype.draw = function(){
            ctx.beginPath();
            
            const g = ctx.createRadialGradient(
                this.X,
                this.Y,
                this.Radius * 0.01,
                this.X,
                this.Y,
                this.Radius
            );
            let rgb = this.RGB;
            g.addColorStop(0.1,`rgba(${rgb.r},${rgb.g},${rgb.b},1)`);
            g.addColorStop(1,`rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            ctx.fillStyle = g;
            ctx.arc(this.X,this.Y,this.Radius,0,Math.PI * 2,false);
            ctx.fill();
        }
        Circle.prototype.Move = function(){
            // console.log(1);
            if(this.X >= width || this.X <= 0 ){
                // this.Color = `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},1)`;
                this.VelX = -this.VelX;
            } 
            if(this.Y >= height || this.Y  <= 0){
                // this.Color = `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},1)`;
                this.VelY = -this.VelY;
            } 
            this.X += this.VelX;
            this.Y += this.VelY;   
        }
        let circles = [];

        for(let i=0;i<40;i++){
            let circOjb = new Circle(random(maxRadii,width-maxRadii),random(maxRadii,height-maxRadii),
            Math.floor(Math.random() * 5+1)-3,
            Math.floor(Math.random() * 5+1)-3,
            300,
            COLORS[colorC]);
            if(++colorC >= COLORS.length) colorC =0;
            circles.push(circOjb);
        }
        
        function animation(){
            requestAnimationFrame(animation);
            ctx.clearRect(0,0,width,height);
            circles.forEach(function(circObj){
                circObj.Move();
                circObj.draw();
            });

        }
        animation();


