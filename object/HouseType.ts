type HouseType = {
  id: number;
  name: string;
  price: number;
  area: string;
  floor: number;
  elevator: boolean;
  parking: boolean;
};

type HouseData = {
  firstAuthor: HouseType[];
  secondAuthor: HouseType[];
};

type HouseParams = {
  firstAuthorId: string;
  secondAuthorId: string;
};
