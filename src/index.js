import draw from './three/main';
let options={
    rainCount:1000,
    cloudCount:35,
    thunderCount:40
};

function eventsHandler() {
    let form=document.querySelector('#settingsForm');

    document.querySelector('#settingsForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let newOptions={}
        Array.prototype.forEach.call(document.querySelectorAll('.options'),(element)=>{
            console.log("element.id: ", element.id)

            console.log("element.value: ", element.value)
            newOptions[element.id] = element.id==="thunderCount" ?  50-(element.value) : element.value;
        });
        draw(newOptions);
    });
}
eventsHandler();
console.log("outside options: ",options)
draw(options);