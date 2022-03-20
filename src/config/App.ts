import { FRONTEND_URL } from "@/utils/constants.js";
import express from "express";
import cors from "cors";
import strictTransportSecurity from "strict-transport-security";

class App {
	public static app: App;
	public expressApp: express.Application;

	private constructor() {
		//
	}

	private static configureExpressApp(): void {
		this.app.expressApp.use(express.urlencoded({ extended: true }));
		this.app.expressApp.use(
			cors({
				origin: FRONTEND_URL,
				credentials: true,
			})
		);
		const sts = strictTransportSecurity.getSTS({ "max-age": { days: 30 } });
		this.app.expressApp.use(sts);
	}

	public static async getAppInstance(): Promise<App> {
		if (!this.app) {
			this.app = new App();
			this.app.expressApp = express();
			this.configureExpressApp();
		}

		return this.app;
	}
}

export default await App.getAppInstance();
