import { anakRedux } from "./AnakRedux";
import { DataAnakRedux } from "./DataAnak";
import { DataIbuRedux } from "./DataIbuRedux";
import { AnswerRedux } from "./AnswerRedux";
import { ResultRedux } from "./ResultRedux";
import { ScoreRedux } from "./ScoreRedux";

const { combineReducers, createStore } = require("redux")
const { IbuRedux } = require("./IbuRedux")
const { DisabledRedux } = require("./DisabledRedux")

const rootReducer = combineReducers({
    Ibu: IbuRedux,
    Disabled: DisabledRedux,
    DataAnak: DataAnakRedux,
    DataIbu: DataIbuRedux,
    Anak: anakRedux,
    Answer: AnswerRedux,
    Result: ResultRedux,
    Score: ScoreRedux
});

const store = createStore(rootReducer);

export default store;