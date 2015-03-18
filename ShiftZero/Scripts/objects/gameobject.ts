module objects {
    // GAMEOBJECT CLASS
    export class GameObject extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        public width: number;
        public height: number;
        public isColliding: boolean = false;
        public sound: string;
        public isHarmful: boolean;
        public isFriendly: boolean;
        public isActive: boolean;
        protected _dy: number;
        protected _dx: number;

        // CONSTRUCTOR
        constructor(assetString: string) {
            super(assetLoader.getResult(assetString));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
        }

    }

}  