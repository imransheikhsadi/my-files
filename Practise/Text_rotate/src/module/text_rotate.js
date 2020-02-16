
class Rotate {
    constructor(element, rotator,time) {
      this.rotatorType(rotator)(element,time);
    }


  //check the roraror type ----------------------------------
    rotatorType = rotator => {
      switch (rotator) {

        case "UP_FADE":
          return this.up_fade;
  
        case "ELASTIC":
          return this.elastic;
  
        default:
          console.log('No Rotator matched')
      }
    };
  
  
  
    //Elastric Rotate -----------------------------------------
    elastic = (element,time) => {
      this.addClass(element,'elastic_rotate-container');
      this.itarator(element,'e-r',time)
    };

    //Up Fade Rotate -------------------------------------------
    up_fade = (element,time) => {
      this.addClass(element,'elastic_rotate-container');
      this.itarator(element,'u-f',time)
    }

    //Itarator ---------------------------------------------

    itarator = (element,animation_name,time) => {
      let i = 0;
  
      let idList = [];

      document.querySelector(`.${element}`).childNodes.forEach(item => {
        if (item.id) {
          idList.push(item.id);
        }
      });
      const animate = () => {
        
        if (i === idList.length) {
          i = 0;
        }
        let current_text = idList[i];
        let next_text = i === idList.length - 1 ? idList[0] : idList[i + 1];
        
        document.getElementById(current_text).className = "";
        document.getElementById(next_text).className = "";
        
        
        document
        .getElementById(current_text)
        .classList.add(`${animation_name}_out`);
        
        
        document
        .getElementById(next_text)
        .classList.add(`${animation_name}_in`);
        
        
        i++;
      };
      setInterval(animate, time);
    }

    //Utility Methods --------------------------------------


    addClass = (whereToAdd,whichClassToAdd) => {
        document.querySelector(`.${whereToAdd}`).classList.add (whichClassToAdd)
    };
  }

export default Rotate;