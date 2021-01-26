/**
 * @class Service
 * Manage all operations on users
 */

class UserService {
	constructor() {
		//tenta recuperar usuários do local storage. Caso não esteja definido, gera um array vazio
		const users = JSON.parse(localStorage.getItem('users')) || [];
		//gera uma coleção de instâncias da classe User, pois o storage só armazena dados...
		this.users = users.map((user) => new User(user));
		/**    Note that we have defined a class variable called users that stores all users once
          * they have been transformed from a flat object to a prototyped object of the User class.
          */
	}

	bindUserListChanged(callback) {
		this.onUserListChanged = callback;
	}
	/**
     * @method
     * @param {*} users 
     * The commit method is responsible for storing the operation performed in our data store
     *  (in our case LocalStorage).
     * Este método desacopla o modelo do serviço
     */
	_commit(users) {
		this.onUserListChanged(users); //Avisa sobre a mudança da lista
		localStorage.setItem('users', JSON.stringify(users)); //salva o conteúdo no localStorage
	}

	/**
     * Todos os métodos para executar o CRUD
     */
	add(user) {
		this.users.push(new User(user));
		this._commit(this.users);
	}

	edit(_id, userToEdit) {
		this.users = this.users.map((user) => (
			user.id === _id ? new User({ ...user, ...userToEdit }) : user)
			//Se encontrar o usuário, substitui seus campos pelos novos, gerando um novo registro com um novo id
		);
		this._commit(this.users); // salva os registros...
	}

	delete(_id) {
		this.users = this.users.filter(({ id }) => id !== _id);
		//gera um novo array com todos os elementos em que o id é diferente do procurado
	}
	toggle(_id) {
		this.users = this.users.map(
			(user) => (user.id === _id ? new User({ ...user, complete: !user.complete }) : user)
        );
        this._commit(this.users);
	}
}
