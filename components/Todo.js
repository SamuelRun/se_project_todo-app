class Todo {
  constructor(data, selector, handleCheck, handleDelete, handleTodo) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._completed = data._completed;
    this._handelDelete = handleDelete;
    this._handleTodo = handleTodo;
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handelDelete(this._data._completed);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data._completed = !this._data._completed;
      this._handleCheck(this._data._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data._completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateTodoDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateTodoDate();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
