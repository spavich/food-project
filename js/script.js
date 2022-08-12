'use strict';

window.addEventListener('DOMContentLoaded', ()=>{
	// Tabs
	const tabcontent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items'),
				tabs = document.querySelectorAll('.tabheader__item');

	function hideTabContent (){
		tabcontent.forEach(item =>{
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item =>{
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i = 0){
		tabcontent[i].classList.remove('hide');
		tabcontent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent ();
	showTabContent();

	tabsParent.addEventListener('click', (e)=>{
		const target = e.target;

		if(target && target.classList.contains('tabheader__item')){
			tabs.forEach((item, i)=>{
				if(target == item){
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
});