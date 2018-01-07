import Track from './track';
import Status from './status';
import QuestionType from './question_type';
import Answer from './answer';

export interface Question {
  id?: number;
  type: QuestionType;
  title: string;
  description?: string;
  answers: Answer[];
  answered?: boolean;
  track: Track;
  status: Status;
}

export default Question;
