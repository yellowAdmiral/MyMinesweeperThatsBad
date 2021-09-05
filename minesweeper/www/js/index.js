var row, col, start=0;
var m=[0,0,0];
var flags = [0,0,0];
var redf=0;
var flagcount=0;
var tiles = new Array(8);  
for (var i = 0; i < tiles.length; i++) { 
    tiles[i] = new Array(8); 
}
var nearMine = new Array(3);
for (var i = 0; i < nearMine.length; i++) { 
    nearMine[i] = new Array(8); 
}
var flagpos = new Array(8);  
for (var i = 0; i < tiles.length; i++) { 
    flagpos[i] = new Array(8); 
}
var open = new Array(8);  
for (var i = 0; i < tiles.length; i++) { 
    open[i] = new Array(8); 
}

function openinit(){
    //    arrinit();
        var n;
       for(p=0;p<8;p++)
       {
           for(q=0;q<7;q++)
           {
                open[p][q]=0;
                // console.log(tiles[p][q]);
           }
       }
    }
var p,q;
var flag=0;

function flagger(){
    if(redf==1){
        redf=0;
    }
    else{
        redf=1;
    }
}

function ranmine(){
    row=((Math.random()*(8-1))+1).toFixed(0);
    col=((Math.random()*(8-1))+1).toFixed(0);
}

function nearMs(pressed , temp){
    var rm, cm;
    rm=Math.floor(pressed/10).toFixed(0)-1;
    cm=Number(pressed%10).toFixed(0)-1;
    for(i=(rm);i<=Number(rm+2);i++)
    {
        for(j=(cm);j<=Number(cm+2);j++)
        {
            var noMine=(i)*10+(j);
            //console.log(noMine);
            //console.log(temp);
            if(temp == noMine)
                   return 1;
            
        }
    }
}


function selectmines(pressed){
    var i=0,j;
    var temp,temp2;
    lab : for(i;i<3;i++){
        ranmine();
        temp=row+col;
        temp2 = nearMs(pressed , temp);
        for(j=0;j<3;j++)
        {
            if(temp==m[j] || temp==pressed || temp2==1)
            {
                i--;
                continue lab;
            }
        }
        m[i]=temp;
        console.log(m[i]);
    }
    arrfill();
    openinit();
}

function fillarr(x,y){
    var pop;
    for(pop=0;pop<3;pop++){
    if((x+1)*10+(y+1)==m[pop])
    return -1;
}
 var i,j,s,n=0;
    for(i=(x);i<=Number(x+2);i++)
    {
        for(j=(y);j<=Number(y+2);j++)
        {
            var pt = Number(i*10+j);
            // console.log(pt);
            if(pt!= (x+1)*10+(y+1)){
            for(s=0;s<3;s++)
                {
                    if(m[s]==pt)
                    n++;
                }
        }
    }
    }
   return n;
}

function arrfill(){
//    arrinit();
    var qwe;
   for(p=0;p<8;p++)
   {
       for(q=0;q<8;q++)
       {
            qwe=fillarr(p,q)
            tiles[p][q]=qwe;
            // console.log(tiles[p][q]);
       }
   }
}
function showmines(){
    for(p=0;p<3;p++)
    {
        document.getElementById(m[p]).src="img/mine.png";
    }
    document.getElementById('score').innerHTML="Score =";
}

function change(id){
    if(start==0){
    start=1;
    selectmines(id)
    }
    var r , c;
    Number(c);
    r=Math.floor(id/10).toFixed(0)-1;
    c=Number(id%10).toFixed(0)-1;
    if(redf==0 && open[r][c]!=1){
        open[r][c]=1;
        if(tiles[r][c]==1 && flagpos[r][c]!=1)
        {
            document.getElementById(id).src="img/one.png";
        }
        if(tiles[r][c]==2 && flagpos[r][c]!=1)
        {
            document.getElementById(id).src="img/two.png";
        }
        if(tiles[r][c]==3 && flagpos[r][c]!=1)
        {
            document.getElementById(id).src="img/three.png";
        }
        if(tiles[r][c]==0 && flagpos[r][c]!=1)
        {
            document.getElementById(id).src="img/clicked.png";
        }
           if(tiles[r][c]==-1 && flagpos[r][c]!=1)
        {
            document.getElementById(id).src="img/mine.png";
            alert("Game Over");
            showmines();
        }
    }
    else if(redf==1 && open[r][c]!=1){
        if(flagpos[r][c]==1){
        document.getElementById(id).src="img/unclicked.png";
        flagpos[r][c]=0;
        flagcount--;
        }
        else if (flagpos[r][c] != 1  && flagcount<3){
        document.getElementById(id).src="img/flag.png";
        flagpos[r][c]=1;
        flags[flagcount]=Number((r+1)*10+(c+1));
        console.log(flags[flagcount])
        flagcount++;
        if(flagcount==3){
            gamecheck();
        }
        }
    }
}

function gamecheck(){
    var p,q;
    var matched = 0;
    for(p=0;p<3;p++){
        for(q=0;q<3;q++){
            if(m[p]==flags[q])
            {
                matched++;
            }
        }
    }
    if (matched== 3){
        alert("You Won !");
    }
    else return;
}