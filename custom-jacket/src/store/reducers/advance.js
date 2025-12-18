let initState = {
  chestPocket: false,
  stripes: false,
  piping: false,
  sleevesPiping: false,
  proCuff: false,
  inserts: false,
  insertsCount: 1,
  sleevePocket: false,
};

const advance = (state = initState, { type, data }) => {
  switch (type) {
    case 'ADVANCE_OPTION':
      return {
        ...state,
        [data.key]: data.val,
      };

    case 'REPLACE_ADVANCE':
      return data;

    default:
      return state;
  }
};

export default advance;
