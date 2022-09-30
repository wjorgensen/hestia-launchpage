

function onClick(){
    const submitbutton = document.getElementById("submit");
    submitbutton.textContent="Thank you for\r\nsigning up";
    submitbutton.innerHTML = submitbutton.innerHTML.replace(/\n\r?/g, '<br />');
}