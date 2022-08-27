// 创建“外壳”组件APP
import React, { Component } from 'react';
import Header from './conponent/Header';
import List from './conponent/List';
import Footer from './conponent/Footer';
import './App.css';

// 创建并暴露App组件
export default class App extends Component {
	// 初始化状态
	state = {
		todos: [
			{ id: '001', name: '吃饭', done: true },
			{ id: '002', name: '睡觉', done: true },
			{ id: '003', name: '打代码', done: false },
		],
	};
	// 用于添加一个todo，给Header
	addTodo = todoObj => {
		// 获取原todos
		const { todos } = this.state;
		// 追加一个todo
		const newTodos = [todoObj, ...todos];
		// 更新状态
		this.setState({ todos: newTodos });
	};

	// 用于勾选和取消勾选todo，给Item（通过List）
	updateTodo = (id, done) => {
		// 获取状态中todos
		const { todos } = this.state;
		// 将对应的todo更改checked状态
		const newTodos = todos.map(todo => {
			if (todo.id === id) return { ...todo, done };
			else return todo;
		});
		this.setState({ todos: newTodos });
	};

	// 删除一个todo
	deleteTodo = id => {
		const { todos } = this.state;
		// 删除指定id的对象
		const newTodos = todos.filter(todo => {
			return todo.id !== id;
		});
		// 更新状态
		this.setState({ todos: newTodos });
	};

	// 用于全选
	checkAllTodo = done => {
		//获取原来的todos
		const { todos } = this.state;
		//加工数据
		const newTodos = todos.map(todo => {
			return { ...todo, done };
		});
		//更新状态
		this.setState({ todos: newTodos });
	};

	// 清除已完成的事项
	clearAllDone = () => {
		const { todos } = this.state;
		// 过滤数据
		const newTodos = todos.filter(todo => {
			// done为true的就不会被返回
			return !todo.done;
		});
		// 更新数据
		this.setState({ todos: newTodos });
	};
	render() {
		const { todos } = this.state;
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo} />
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
					<Footer
						todos={todos}
						checkAllTodo={this.checkAllTodo}
						clearAllDone={this.clearAllDone}
					/>
				</div>
			</div>
		);
	}
}
