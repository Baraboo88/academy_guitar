import {AddCommentModel, GuitarCommentModel, GuitarModel, GuitarType} from '../types/guitar-model';
import {createApi} from '../api';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {ReactWrapper} from 'enzyme';


export const MOCK_ERROR= 'Somme error';

export const mockGuitars: GuitarModel[] = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: 'electric' as GuitarType,
    description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 2,
    name: 'CURT Z300',
    vendorCode: 'TK129049',
    type: 'electric' as GuitarType,
    description: 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    previewImg: 'img/guitar-8.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 29500,
  },
  {
    id: 3,
    name: 'Roman LX',
    vendorCode: 'RO111111',
    type: 'ukulele' as GuitarType,
    description: 'Укулеле класса премиум от компании CURT, собравшая в себе все самые необходимые качесва: лёгкость корпуса, прочность струн и компактный размер.',
    previewImg: 'img/guitar-6.jpg',
    stringCount: 4,
    rating: 4,
    price: 6800,
  },
  {
    id: 4,
    name: 'CURT T300',
    vendorCode: 'TK436457',
    type: 'electric' as GuitarType,
    description: 'CURT T300 - это шестиструнная электрогитара популярной линейки FPT. Модель с классическим стилем головы грифа и деки.',
    previewImg: 'img/guitar-3.jpg',
    stringCount: 6,
    rating: 5,
    price: 30000,
  },
  {
    id: 5,
    name: 'Dania Super',
    vendorCode: 'DI192138',
    type: 'acoustic' as GuitarType,
    description: 'Гитары производителя Dania пользуются популярностью у музыкантов разного уровня. В модели Super идеально сочетаются демократичная цена и качество. Корпус, выполненный из тополя позволяет корпусу долгое время сохранять свой первоначальный вид.',
    previewImg: 'img/guitar-4.jpg',
    stringCount: 7,
    rating: 4.5,
    price: 3500,
  },
  {
    id: 6,
    name: 'Честер WX',
    vendorCode: 'SO934345',
    type: 'electric' as GuitarType,
    description: 'Электрогитара с олд-скульным грифом и глянцевым корпусом для настоящих рок-музыкантов. Насыщенный звук идеально подойдет для исполнения рок-композиций.',
    previewImg: 'img/guitar-2.jpg',
    stringCount: 6,
    rating: 3.5,
    price: 15300,
  },
  {
    id: 7,
    name: 'Dania VX',
    vendorCode: 'DI082347',
    type: 'ukulele' as GuitarType,
    description: 'Укулеле - прекрасный компактный аналог классической акустической гитары. Прекрасное качество продуктов компании Dania сочетается с демократичными ценами продуктов линейки GSR.',
    previewImg: 'img/guitar-5.jpg',
    stringCount: 4,
    rating: 2.5,
    price: 2200,
  },
];
export const testInitialState = {
  currentGuitar: {
    currentGuitar: mockGuitars,
    errorMsg: '',
  },
  guitars: {
    guitars: mockGuitars,
    errorMsg: '',
  },
};

export const mockCommentToAdd: AddCommentModel = {
  advantage: 'Mock Advantage', comment: 'Mock Comment', disadvantage: 'Mock Disadvantage', guitarId: 3, rating: 3, userName: 'Some name',
};


export const mockComment: GuitarCommentModel = {id: '31b10247-adff-44a7-937e-c71af64f425b',
  userName: 'Никита',
  advantage: 'Цена.',
  disadvantage: 'Быстро приходит в негодность покрытие краской.',
  comment: 'Хорошая гитара для начинающих, сделана качественно. Лучше за эти деньги не найти.',
  rating: 5,
  createAt: new Date('2022-03-10T10:56:01.590Z'),
  guitarId: 1};

export const getTestStore = () => {

  const reducer = (state = testInitialState) => state;
  const api = createApi();

  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
};

export const findByTestAtr = (component:ReactWrapper, attr: string) => component.find(`[data-test='${attr}']`);
