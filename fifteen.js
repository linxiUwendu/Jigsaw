(function (){
    "use strict";

    const myNum=[];

    window.onload=function() {

        const puz=document.getElementById("puzzlearea");

        document.getElementById("shufflebutton").onclick=start;
        for(let j=0; j<4; j++){
            let one= document.createElement("div");
            //console.log(1);
            for(let i=0; i<4; i++){
                let puz1=document.createElement("div");
                puz1.classList.add("puzzle");
                let num=j*4+1+i;
                puz1.id="puzzle"+"_"+num;
                let p=document.createElement("p");
                p.classList.add("number");
                p.innerHTML=num;
                puz1.appendChild(p);
                let lo=-100*j;
                let co=-100*i;
                let myLo=lo+"px";
                let myCo=co+"px";
                if(j*4+i+1!=16){
                    puz1.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                }

                one.appendChild(puz1);
            }
            puz.appendChild(one);
        }//初始化地图
        //绑定点击事件
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                let num=j*4+1+i;
                let lab="puzzle"+"_"+num;
                let c=document.getElementById(lab);
                c.onclick=operat;
                c.onmouseover=hand;
                c.onmouseout=handout;
            }
        }
        //初始化随机数数组

        for(let i=0; i<4; i++){
            let tem=[];
            myNum.push(tem);
        }
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                myNum[i][j]=i*4+j+1;
            }
        }
        // console.log(myNum);
        // var p=puz.lastChild;
        // console.log(p);
    };
//开始函数
    let start= function(){
        let org=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        org.sort(function(){
            return 0.5-Math.random();
        });
        org.push(16);
        //先进行是否可解的检测
        let myText=[];
        for(let i=0; i<16; i++){
            myText[org[i]]=i;
        }
        let count=0;
        for(let i=1; i<16; i++){
            for(let j=1; j<i; j++){
                if(myText.indexOf(j)>myText.indexOf(i)){
                    count++;
                }
            }
        }
        // console.log(count);
        // console.log(org);
        //这里用了求逆序数总和的方法来判断最终结果是否可解，若count是偶数，则可解，反之，则再次生成随机数，即可保证count是偶数
        while(count%2===1){
            //console.log(1);
            let org=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
            org.sort(function(){
                return 0.5-Math.random();
            });
            org.push(16);
            //重复生成随机数
            myText=[];
            for(let i=0; i<16; i++){
                myText[org[i]]=i;
            }
            count=0;
            for(let i=1; i<16; i++){
                for(let j=1; j<i; j++){
                    if(myText.indexOf(j)>myText.indexOf(i)){
                        count++;
                    }
                }
            }
            // console.log(count);
        }
        //至此，保证了随机数组可解

        // console.log(count);
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                myNum[i][j]=org[i*4+j];
                let num=i*4+1+j;
                let lab="puzzle"+"_"+num;
                let c=document.getElementById(lab);
                let tem=c.firstChild;
                c.removeChild(tem);
                let p=document.createElement("p");
                p.classList.add("number");
                p.innerHTML=myNum[i][j];

                c.appendChild(p);
                let lo=parseInt(myNum[i][j]/4.3)+1;
                let co=myNum[i][j]-4*lo+4;
                // console.log(lo);
                // console.log(co);
                let myLo=-100*(lo-1)+"px";
                let myCo=-100*(co-1)+"px";
                if(myNum[i][j]!=16){
                    c.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                }
                if(myNum[i][j]===16){
                    c.style.background="#ffffff";
                }
                // c.style.background='url(bg.jpg)';
            }
        }
        //console.log(myNum);
        //将随机数赋值给二维数组


    };
    let operat=function (){
        let c=this;
        let num=c.id.split("_")[1];
        let co=parseInt(num/4.3)+1;
        let lo=num-co*4+4;
        //将id转化为行列
        // console.log(co);
        // console.log(lo);
        //检测周围是否有16存在
        //console.log(myNum[co-1][lo-1]);
        //至此调试没问题
        if(lo<4 && myNum[co-1][lo]===16){
            //console.log(1);//右边
            let tem=myNum[co-1][lo];
            myNum[co-1][lo]=myNum[co-1][lo-1];
            myNum[co-1][lo-1]=tem;//交换两个变量的值
            //console.log(myNum);
            for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let num=i*4+1+j;
                    let lab="puzzle"+"_"+num;
                    let c=document.getElementById(lab);
                    let tem=c.firstChild;
                    c.removeChild(tem);
                    //console.log(c);
                    let p=document.createElement("p");
                    p.classList.add("number");
                    p.innerHTML=myNum[i][j];
                    c.appendChild(p);
                    let lo1=parseInt(myNum[i][j]/4.3)+1;
                    let co1=myNum[i][j]-4*lo1+4;
                    // console.log(lo);
                    // console.log(co);
                    let myLo=-100*(lo1-1)+"px";
                    let myCo=-100*(co1-1)+"px";
                    if(myNum[i][j]!=16){
                        c.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                    }
                    if(myNum[i][j]===16){
                        // console.log("hello");
                        c.style.background="#ffffff";
                    }
                    // c.innerHTML=myNum[i][j];//后续修改时将这里加上修改css里面的背景
                }
            }

        } else if(co<4&&myNum[co][lo-1]===16){
            //console.log(2);//下边
            let tem=myNum[co][lo-1];
            myNum[co][lo-1]=myNum[co-1][lo-1];
            myNum[co-1][lo-1]=tem;//交换两个变量的值
            //console.log(myNum);
            for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let num=i*4+1+j;
                    let lab="puzzle"+"_"+num;
                    let c=document.getElementById(lab);
                    let tem=c.firstChild;
                    c.removeChild(tem);
                    let p=document.createElement("p");
                    p.classList.add("number");
                    p.innerHTML=myNum[i][j];
                    c.appendChild(p);
                    let lo1=parseInt(myNum[i][j]/4.3)+1;
                    let co1=myNum[i][j]-4*lo1+4;
                    // console.log(lo);
                    // console.log(co);
                    let myLo=-100*(lo1-1)+"px";
                    let myCo=-100*(co1-1)+"px";
                    if(myNum[i][j]!=16){
                        c.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                    }
                    if(myNum[i][j]===16){
                        c.style.background="#ffffff";
                    }
                }
            }

        } else if(lo>1&&myNum[co-1][lo-2]===16){
            //console.log(3);//左边
            let tem=myNum[co-1][lo-2];
            myNum[co-1][lo-2]=myNum[co-1][lo-1];
            myNum[co-1][lo-1]=tem;//交换两个变量的值
            //console.log(myNum);
            for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let num=i*4+1+j;
                    let lab="puzzle"+"_"+num;
                    let c=document.getElementById(lab);
                    let tem=c.firstChild;
                    c.removeChild(tem);
                    let p=document.createElement("p");
                    p.classList.add("number");
                    p.innerHTML=myNum[i][j];
                    c.appendChild(p);
                    let lo1=parseInt(myNum[i][j]/4.3)+1;
                    let co1=myNum[i][j]-4*lo1+4;
                    // console.log(lo);
                    // console.log(co);
                    let myLo=-100*(lo1-1)+"px";
                    let myCo=-100*(co1-1)+"px";
                    if(myNum[i][j]!=16){
                        c.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                    }
                    if(myNum[i][j]===16){
                        c.style.background="#ffffff";
                    }
                }
            }
        } else if(co>1&&myNum[co-2][lo-1]===16){
            //console.log(4);//上面
            let tem=myNum[co-2][lo-1];
            myNum[co-2][lo-1]=myNum[co-1][lo-1];
            myNum[co-1][lo-1]=tem;//交换两个变量的值
            //console.log(myNum);
            for(let i=0; i<4; i++){
                for(let j=0; j<4; j++){
                    let num=i*4+1+j;
                    let lab="puzzle"+"_"+num;
                    let c=document.getElementById(lab);
                    let tem=c.firstChild;
                    c.removeChild(tem);
                    let p=document.createElement("p");
                    p.classList.add("number");
                    p.innerHTML=myNum[i][j];
                    c.appendChild(p);
                    let lo1=parseInt(myNum[i][j]/4.3)+1;
                    let co1=myNum[i][j]-4*lo1+4;
                    // console.log(lo);
                    // console.log(co);
                    let myLo=-100*(lo1-1)+"px";
                    let myCo=-100*(co1-1)+"px";
                    if(myNum[i][j]!=16){
                        c.style.background='url(bg.jpg)'+' '+ myCo+' '+ myLo;
                    }
                    if(myNum[i][j]===16){
                        c.style.background="#ffffff";
                    }
                }
            }

        } else{
            // console.log(5);
        }
        //检测是否获胜
        let success=false;
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                if(myNum[i][j]!=i*4+j+1) {
                    break;

                }
                if((i===3&&j===3)&&myNum[i][j]===16){
                    success=true;
                }
            }
        }
        // console.log(success);
        if(success){
            alert("Congratulations!You won!");
        }
        // console.log(myNum);

    };
    let hand=function (){
        let c=this;
        let num=c.id.split("_")[1];
        // console.log(num);
        let co=parseInt(num/4.3)+1;
        let lo=num-co*4+4;

        if(lo<4&&myNum[co-1][lo]===16){
            c.classList.add("onchoose");
        } else if(co<4&&myNum[co][lo-1]===16){
            c.classList.add("onchoose");
        } else if(lo>1&&myNum[co-1][lo-2]===16){
            c.classList.add("onchoose");
        } else if(co>1&&myNum[co-2][lo-1]===16){
            c.classList.add("onchoose");
        }
        // c.classList.add("onchoose");
        // console.log(a);
    };
    let handout=function (){
        let c=this;
        // console.log(c.classList)
        for(let i=0; i<c.classList.length; i++){
            if(c.classList[i]=="onchoose"){
                // console.log(2);
                c.classList.remove("onchoose");
            }
        }

    };
})();

