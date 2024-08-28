class searchForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let searchFormContainer = this.children[0];
        let searchFormContent = searchFormContainer.querySelector('.search-form');
        let searchFormClose = this.querySelector('.search-form__close');
        let iconSearch = document.querySelector('#icon-search');

        iconSearch.addEventListener('click', function() {
            this.classList.remove('hidden');

            setTimeout(() => {
                this.classList.add('search-form-opacity');
            }, 10);

            setTimeout(() => {
                searchFormContainer.classList.add('search-form-enrolled');
            }, 210);

            setTimeout(() => {
                searchFormContent.classList.add('search-form-opacity');
            }, 600);
        }.bind(this));

        searchFormClose.addEventListener('click', function() {
            searchFormContent.classList.remove('search-form-opacity');

            setTimeout(() => {
                searchFormContainer.classList.remove('search-form-enrolled');
            }, 200);

            setTimeout(() => {
                this.classList.remove('search-form-opacity');
            }, 400);

            setTimeout(() => {
                this.classList.add('hidden');
            }, 600);
        }.bind(this));
    }
}

customElements.define('search-form', searchForm)