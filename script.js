const inputArabic= document.querySelector('#input--arabic');
const resultRoman= document.querySelector('#result--roman');
const buttonConvert= document.querySelector('#button--convert');
const alertError= document.querySelector('#alert--error');

const ROMAN_NUMERALS= {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
};

// ---------- ----------

window.addEventListener('load', () => {
    inputArabic.value= '';
    inputArabic.focus();
});

inputArabic.addEventListener('focusout', () => {

    if(inputArabic.value === ''){
        cleanResult();
        hideAlert();
    }
});

buttonConvert.addEventListener('click', () => {

    const inputValue= inputArabic.value;

    if(/^\d+$/.test(inputValue) &&
        (0<inputValue && inputValue<4000)){

        resultRoman.innerHTML= convertToRoman(inputValue);
        hideAlert();
        
    }else{
        alertError.classList.remove('main__alert--hidden');
        cleanResult();
    }    
});

// ---------- ----------

const cleanResult= () => resultRoman.innerHTML= '';

const hideAlert= () => alertError.classList.add('main__alert--hidden');

const convertToRoman= arabic => {

    let roman= '';
    let number= arabic;

    for(let i in ROMAN_NUMERALS) {
        if(number >= ROMAN_NUMERALS[i]){

            let digitLength;
            let index= Object.keys(ROMAN_NUMERALS).indexOf(i);
            let previous= Object.keys(ROMAN_NUMERALS)[index+1];
            let next= Object.keys(ROMAN_NUMERALS)[index-1];
      
            const calculateNumber= x => x % ROMAN_NUMERALS[i];
            const calculateDigitLength= (x,k) => parseInt(x/ROMAN_NUMERALS[k]);
      
            if(['M','C','X','I'].includes(i)){
        
                digitLength= calculateDigitLength(number, i);
                number= calculateNumber(number);

                if(digitLength === 4)
                    roman+= i;
                else
                    for(let j=0; j<digitLength; j++)
                        roman+= i;
        
            }else{ //'D','L','V'

                number= calculateNumber(number);
                digitLength= calculateDigitLength(number, previous);

                if(digitLength === 4)
                    roman+= previous;
                else{          
                    roman+= i;
                    for(let j=0; j<digitLength; j++)
                        roman+= previous;
                }

                number-= digitLength*ROMAN_NUMERALS[previous];
            }

            if(digitLength === 4)
                roman+= next;
        }     
    }
  
    return roman;
};
