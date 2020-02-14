class Rotate {
    constructor(element, rotator) {
      this.rotatorType(rotator)(element);
    }


  //check the roraror type ----------------------------------
    rotatorType = rotator => {
      switch (rotator) {

        case "UP_FADE":
          return this.up_fade;
  
        case "ELASTIC":
          return this.elastic;
  
        default:
          break;
      }
    };
  
  
  
    //Elastric Rotate -----------------------------------------
    elastic = (element) => {
      this.addClass(element,'elastic_rotate-container');
      this.itarator(element,'text_animate-in','text_animate-out')
    };

    //Up Fade Rotate -------------------------------------------
    up_fade = () => {

    }













    //Itarator ---------------------------------------------

    itarator = (element,animate_in,animate_out) => {
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
        let animation_out = idList[i];
        let animation_in = i === idList.length - 1 ? idList[0] : idList[i + 1];
  
        document.getElementById(`${animation_out}`).className = "";
        document.getElementById(`${animation_in}`).className = "";
        document
          .getElementById(`${animation_out}`)
          .classList.add(`${animate_out}`);
        document
          .getElementById(`${animation_in}`)
          .classList.add(`${animate_in}`);
  
        i++;
      };
      setInterval(animate, 3000);
    }

    //Utility Methods --------------------------------------


    addClass = (whereToAdd,whichClassToAdd) => {
        document.querySelector(`.${whereToAdd}`).classList.add (whichClassToAdd)
    };
  }

export default Rotate;