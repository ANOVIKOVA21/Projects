interface GetBallOptions {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
function createListItem(text: string, parent: HTMLUListElement, cssClass: string): void {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  listItem.classList.add(cssClass);
  parent.appendChild(listItem);
}
function createCard(toyObj: GetBallOptions) {
  const card = document.createElement('div');
  const cardTitle = document.createElement('h2');
  const cardImg = document.createElement('img');
  const cardList = document.createElement('ul');

  card.classList.add('card');
  cardTitle.classList.add('card__title');
  cardImg.classList.add('card__img');
  cardList.classList.add('card__list');

  cardImg.src = `./toys/${toyObj.num}.png`;
  cardImg.alt = 'Christmas toy';
  cardTitle.textContent = toyObj.name;
  createListItem('Количество: ' + toyObj.count, cardList, 'card__list-item');
  createListItem('Год покупки: ' + toyObj.year, cardList, 'card__list-item');
  createListItem('Форма: ' + toyObj.shape, cardList, 'card__list-item');
  createListItem('Цвет: ' + toyObj.color, cardList, 'card__list-item');
  createListItem('Размер: ' + toyObj.size, cardList, 'card__list-item');
  if (toyObj.favorite === true) createListItem('Любимая: да', cardList, 'card__list-item');
  else createListItem('Любимая: нет', cardList, 'card__list-item');

  card.appendChild(cardTitle);
  card.appendChild(cardImg);
  card.appendChild(cardList);

  return card;
}

export { GetBallOptions, createCard };
