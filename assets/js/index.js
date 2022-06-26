const close = document.getElementById('close'); 
const aside = document.getElementById('aside');
const main = document.getElementById('main-container');

function closeSidebar() {
   aside.style.transform = 'translateX(-500px)';
   aside.style.width = "0%"
   aside.style.transition = 'all .1s ease-in';
//    main.style.transform = 'translateX(-500px)';
//    main.style.width = "100%"
}

function openSidebar() {
    aside.style.transform = 'translateX(0px)';
    aside.style.display =  'block';
    aside.style.width = "40%"
    aside.style.transition = 'all .2s ease-in';
}


close.addEventListener('click', closeSidebar);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6eb7aea10dmsh3b3530b9b3aec75p1a201bjsn28131ee4b4ef',
		'X-RapidAPI-Host': 'glassdoor.p.rapidapi.com'
	}
};

fetch('https://glassdoor.p.rapidapi.com/company/1651', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));