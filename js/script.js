const smallscreenNav = document.querySelector('.navbar__menu')
const burgerMenu = document.querySelector('.navbar__burger-menu')
const burgerMenuClose = document.querySelector('.navbar__burger-menu-close')
const allNavItems = document.querySelectorAll('.navbar__menu-item')
const videoWrapper = document.querySelector('.details__film')
const video = document.querySelector('.video')
const operationsTab = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const operationsBoxes = document.querySelectorAll('.operations__box')
const smallNavHandler = () => {
	smallscreenNav.classList.toggle('navbar__active')
	navItemsAnimation()
}

const navItemsAnimation = () => {
	let delayTime = 0
	allNavItems.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const playVideoHandler = () => {
	if (videoWrapper.classList.contains('details__film')) {
		video.play()
		videoWrapper.classList.remove('details__film')
		videoWrapper.classList.add('details__film-playing')
	} else {
		video.pause()
		videoWrapper.classList.remove('details__film-playing')
		videoWrapper.classList.add('details__film')
	}
}

operationsTab.addEventListener('click', e => {
	const clicked = e.target.closest('.operations__tab')
	if (!clicked) return
	tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
	clicked.classList.add('operations__tab--active')
	operationsBoxes.forEach(box => box.classList.remove('operations__box--active'))
	document.querySelector(`.operations__box--${clicked.dataset.tab}`).classList.add('operations__box--active')
})

//slider component
const slider = () => {
	const slides = document.querySelectorAll('.slide')
	const btnLeft = document.querySelector('.slider__btn--left')
	const btnRight = document.querySelector('.slider__btn--right')
	const dotContainer = document.querySelector('.dots')

	let curSlide = 0
	const maxSlide = slides.length

	//functions
	let autoPlay = setInterval(() => {
		nextSlide()
	}, 5000)
	const resetAutoPlay = () => {
		clearInterval(autoPlay)
		autoPlay = setInterval(() => {
			nextSlide()
		}, 5000)
	}
	const createDots = () => {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
		})
	}
	const activateDot = slide => {
		document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
		document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
	}
	const goToSlide = slide => {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${100 * (i - slide)}%)`
			s.style.transition = `transform 0.6s`
		})
	}
	const nextSlide = () => {
		if (curSlide === maxSlide - 1) {
			curSlide = 0
		} else {
			curSlide++
		}
		goToSlide(curSlide)
		activateDot(curSlide)
		resetAutoPlay()
	}
	const prevSlide = () => {
		if (curSlide === 0) {
			curSlide = maxSlide - 1
		} else {
			curSlide--
		}
		goToSlide(curSlide)
		activateDot(curSlide)
		resetAutoPlay()
	}
	const init = () => {
		goToSlide(0)
		createDots()
		activateDot(0)
	}
	init()

	btnRight.addEventListener('click', nextSlide)
	btnLeft.addEventListener('click', prevSlide)

	document.addEventListener('keydown', e => {
		if (e.key === 'ArrowLeft') prevSlide()
		e.key === 'ArrowRight' && nextSlide()
	})

	dotContainer.addEventListener('click', e => {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset
			goToSlide(slide)
			activateDot(slide)
		}
	})
}
slider()

burgerMenu.addEventListener('click', smallNavHandler)
burgerMenuClose.addEventListener('click', smallNavHandler)
videoWrapper.addEventListener('click', playVideoHandler)
video.addEventListener('ended', () => {
	videoWrapper.classList.remove('details__film-playing')
	videoWrapper.classList.add('details__film')
})
