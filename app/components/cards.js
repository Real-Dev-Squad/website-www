import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { CARDS_DATA } from '../constants/cards-data';

export default class CardsComponent extends Component {
  @tracked showModal = false;
  @tracked clickedModal;

  CARDS_MAPPING = CARDS_DATA;

  @action toggleModal(id) {
    this.clickedModal = this.CARDS_MAPPING.find((card) => card.id === id);
    this.showModal = !this.showModal;
  }

  @action closeModal() {
    this.showModal = false;
  }
}
