import { Carousel } from 'primereact/carousel';
import { FC, ReactNode, useState } from 'react';
import { defaultCurrentPage, responsiveOptions } from '../constants.ts';
import { useResponsive } from '../hooks';

interface CarouselComponentProps {
  values: unknown[];
  template: (item: any) => ReactNode;
}

const CarouselComponent: FC<CarouselComponentProps> = ({
  values,
  template,
}) => {
  const [page, setPage] = useState<number>(defaultCurrentPage);

  const { isDesktop, isMobile, isTablet } = useResponsive();

  console.log(isDesktop, isMobile, isTablet);

  return (
    <div>
      <Carousel
        value={values}
        numScroll={1}
        numVisible={2}
        responsiveOptions={responsiveOptions}
        itemTemplate={template}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      />
    </div>
  );
};

export default CarouselComponent;
