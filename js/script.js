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
	// Timer
	const deadline = '2023-09-23';
	function getTimeRemaining(endtime){
		const t = Date.parse(endtime) - Date.parse(new Date()),
					days = Math.floor(t / (1000 * 60 * 60 * 24) %365),
					hours = Math.floor(t / (1000 * 60 * 60) %24),
					minutes = Math.floor(t / (1000 * 60) %60),
					seconds = Math.floor((t / 1000) %60);
					
		return{
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function getZero(num){
		if(num >= 0 && num < 10){
			return `0${num}`;
		}else{
			return num;
		}
	}

	function setClock(selector, endtime){
		const timer = document.querySelector(selector),
					days = timer.querySelector('#days'),
					hours = timer.querySelector('#hours'),
					minutes = timer.querySelector('#minutes'),
					seconds = timer.querySelector('#seconds'),
					timeInterval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock(){
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if(t.total <= 0){
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline);


	// Modal Window
	const modalOpenBtns = document.querySelectorAll('[data-modal]'),
				modalCloseBtn = document.querySelector('[data-close]'),
				modalWindow = document.querySelector('.modal');

	/* Open Modal Window */
	const openModalWindow = () =>{
		modalWindow.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearTimeout(modalTimerId);
	};
	/* Close Modal Window */
	const closeModalWindow = () =>{
		modalWindow.classList.toggle('show');
		document.body.style.overflow = 'visible';
	};

	/* Open Modal Window, When clicked on btn*/
	modalOpenBtns.forEach(item =>{
		item.addEventListener('click', openModalWindow);
	});
	/* Open Modal Window, Through 5s */
	const modalTimerId = setTimeout(openModalWindow, 300000);
	/* Open Modal Window, Scroll down to the bottom of the page*/
	function showModalByScroll (){
		// прокрученная часть + видимая высота страницы без прокрутки >= вся высота проскролинной странницы 
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
			openModalWindow ();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	/* Close Modal Window, When clicked on X */
	modalCloseBtn.addEventListener('click', closeModalWindow);
	/* Close Modal Window, When clicked outside the window*/
	modalWindow.addEventListener('click', (e) =>{
		if(e.target === modalWindow){
			closeModalWindow();
		}
	});
	/* Close Modal Window, Escape*/
	document.addEventListener('keydown', (e) =>{
		if(e.code === 'Escape' && modalWindow.classList.contains('show')){
			closeModalWindow();
		}
	});


	// Classes for cards
	class MenuCard{
		constructor(src, alt, title, descr, price, parentSelector, ...classes){
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 27;
			this.changeToUAH ();
		}

		changeToUAH(){
			this.price = (this.price * this.transfer);
		}

		render(){
			const element = document.createElement('div');

			if(this.classes.length === 0){
				element.classList.add('menu__item');
			}else{
				this.classes.forEach(item => element.classList.add(item));
			}

			element.innerHTML = 
			`<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>`

			this.parent.append(element);
		}
	}

	new MenuCard(
		'"img/tabs/vegy.jpg"',
		'"vegy"',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
	).render();
	new MenuCard(
		'"img/tabs/elite.jpg"',
		'"elite"',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		20,
		'.menu .container',
	).render();
	new MenuCard(
		'"img/tabs/post.jpg"',
		'"post"',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		15,
		'.menu .container',
	).render();
});
