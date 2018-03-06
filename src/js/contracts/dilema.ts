import Track from './track';
import Status from './status';
import QuestionType from './question_type';
import Option from './option';

export interface Dilema {
  id?: number;
  type: QuestionType;
  title: string;
  description?: string;
  options: Option[];
  answered?: boolean;
  track: Track;
  status: Status;
}

export default Dilema;
