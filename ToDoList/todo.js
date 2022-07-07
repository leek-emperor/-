// 文本数据
let data = {
	todoArr: [],
	doneArr: [],
};

let storage = localStorage.getItem('todo');
if (storage !== null) {
	data = JSON.parse(storage);
	show(data);
}
// 为add按钮添加点击事件
let add_btn = document.querySelector('#add-btn');
let input_nav = document.querySelector('#nav');
add_btn.addEventListener('click', function (event) {
	if (input_nav.value) {
		data.todoArr.push(input_nav.value); // 加入文本数据
		show(data);
		input_nav.value = ''; // 清空搜索框
	}
});

// 渲染ToDo部分
function show(data) {
	localStorage.setItem('todo', JSON.stringify(data));
	let todoArr = data.todoArr;
	let doneArr = data.doneArr;
	// ToDo添加
	let todoList = document.querySelector('#todoList');
	let todoText = '';
	for (let i = 0; i < todoArr.length; i++) {
		const word = todoArr[i];
		todoText += `<li><input type="checkbox" data-from="todo" data-index=${i}>${word}
	<button data-from="todo" data-index=${i}><i class="fa fa-trash-o fa-2x">
	</i></button></li>`;
	}
	todoList.innerHTML = todoText;

	// Done添加
	let doneList = document.querySelector('#doneList');
	let doneText = '';
	for (let i = 0; i < doneArr.length; i++) {
		const word = doneArr[i];
		doneText += `<li><input type="checkbox" checked="checked" data-from="done" data-index=${i}>${word}
	<button data-from="done" data-index=${i}><i class="fa fa-trash-o fa-2x">
	</i></button></li>`;
	}
	doneList.innerHTML = doneText;

	// 为所有checkbox添加change事件，完成切换
	let input = document.querySelectorAll('[type="checkbox"]');
	for (const checkbox of input) {
		checkbox.addEventListener('change', event => {
			let target = event.target;
			if (target.checked) {
				// 现在是完成的
				let value = data.todoArr.splice(Number(target.dataset.index), 1); // 从toDo里面删除
				data.doneArr.push(value);
				show(data);
			} else {
				// 现在是完成的
				let value = data.doneArr.splice(Number(target.dataset.index), 1); // 从toDo里面删除
				data.todoArr.push(value);
				show(data);
			}
		});
	}

	// 为所有删除button（main）下的添加点击事件
	let remove_btn = document.querySelectorAll('main button');
	for (const button of remove_btn) {
		button.addEventListener('click', event => {
			// 这里target指向了i标签（不知道为什么），所以父节点才是button
			let dataset = event.target.parentNode.dataset;
			if (dataset.from === 'todo') {
				data.todoArr.splice(Number(dataset.index), 1);
				show(data);
			} else if (dataset.from === 'done') {
				data.doneArr.splice(Number(dataset.index), 1);
				show(data);
			}
		});
	}
}
