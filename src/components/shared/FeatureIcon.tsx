import Book from '../../../public/icons/book.svg';
import Crochet from '../../../public/icons/crochet.svg';
import CrossStitch from '../../../public/icons/crossStitch.svg';
import Glass from '../../../public/icons/glass.svg';
import Globe from '../../../public/icons/globe.svg';
import Knit from '../../../public/icons/knit.svg';
import Medication from '../../../public/icons/medication.svg';
import type { Maybe, Nullable } from '../../lib/utils/typeHelpers';

const Icons: Record<string, React.ElementType> = {
  book: Book,
  crochet: Crochet,
  crossStitch: CrossStitch,
  glass: Glass,
  globe: Globe,
  knit: Knit,
  medication: Medication,
};

export function FeatureIcon({
  icon,
  classes,
}: {
  icon?: Nullable<string>;
  classes?: Nullable<string>;
}) {
  const ChosenIcon = icon ? (Icons[icon] as Maybe<React.ElementType>) : null;

  if (ChosenIcon) {
    return (
      <span>
        <ChosenIcon className={classes} />
      </span>
    );
  }
  return (
    <span>
      <Globe className={classes} />
    </span>
  );
}
