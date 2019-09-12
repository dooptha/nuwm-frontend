const abbreviations = {
  'Лабораторна робота': 'Лаб. робота',
  'Практичне заняття': 'Практика',
  'Open Officе ': 'O. F.',
  'Бібліотека ': 'Бібл.',
  'Спорткомплекс ': 'Сп.ком.',
  '1 корпус ': '1 к.',
};

export default (name) => abbreviations[name] || name;
