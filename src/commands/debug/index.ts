import { category } from "../../utils/command";
import ping from "./ping";
import play from "./play";

export default category("Debug", [ping, play]);
