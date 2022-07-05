var timer;
let doms = {
	// 轮播图
	carousel: document.querySelector('.carousel'),
	// 指示器
	indicator: document.querySelectorAll('.indicator span'),
};
var maxNum = doms.indicator.length - 1;

/**
 *
 * @param {Number} index 索引
 */
function moveTo(index) {
	doms.carousel.style.transform = `translateX(-${index}00%)`;
	// 去除当前选中的指示器
	var active = document.querySelector('.indicator span.active');
	active.classList.remove('active');
	// 重新设置指示器
	doms.indicator[index].classList.add('active');
}

timer = setInterval(function () {
	let active = document.querySelector('.indicator span.active');
	let index = Array.from(doms.indicator).indexOf(active);
	if (index == maxNum) {
		moveTo(0);
	} else {
		moveTo(++index);
	}
}, 2000);

doms.indicator.forEach(function (item, index) {
	item.onclick = function () {
		clearInterval(timer);
		moveTo(index);
		timer = setInterval(function () {
			let active = document.querySelector('.indicator span.active');
			let index = Array.from(doms.indicator).indexOf(active);
			if (index == maxNum) {
				moveTo(0);
			} else {
				moveTo(++index);
			}
		}, 2000);
	};
});
