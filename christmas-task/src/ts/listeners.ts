  cardsContainer.addEventListener('click', (ev: Event) => {
    const card = (ev.target as HTMLElement).closest('.card');
    if (card != null) {
      const selectedBallsEl = document.querySelector('.selected-balls__num') as HTMLSpanElement;
      card.classList.toggle('card-active');
      const atr = card.getAttribute('data-card-num') as string;
      let chosenToy = filters.activeCardsNums.length;
      if (card.classList.contains('card-active')) {
        if (chosenToy === 20) {
          showWarning(cardsContainer);
          card.classList.remove('card-active');
        } else {
          chosenToy++;
          card.setAttribute('data-is-active', 'true');
          filters.activeCardsNums.push(atr);
        }
      } else {
        chosenToy--;
        card.setAttribute('data-is-active', 'false');
        console.log(filters.activeCardsNums);
        filters.activeCardsNums = filters.activeCardsNums.filter((num) => num !== atr);
        console.log(filters.activeCardsNums);
      }
      selectedBallsEl.textContent = chosenToy.toString();
    }
  });
