(async () => {
    // The first two characters of the hash is always "oo".
    const SEGMENT_OFFSET = 2;

    // The length of each attribute hash segment.
    const SEGMENT_LENGTH = 3;

    // Char code for "1"
    const HASH_SUM_MIN = 49 * SEGMENT_LENGTH;

     // Char code for "z"
    const HASH_SUM_MAX = 122 * SEGMENT_LENGTH;

    window.$fxhashFeatures = {};

    const generate = () => fxCandyConfig.map((attribute, idx) => {
        const nextHashIndex = (idx * SEGMENT_LENGTH) + SEGMENT_OFFSET;

        const hashSegment = fxhash.substring(nextHashIndex, nextHashIndex + SEGMENT_LENGTH);

        let hashSum = 0;
        let hashCharacterCodes = [];

        for(let i = 0; i < hashSegment.length; i++) {
            const characterCode = hashSegment.charCodeAt(i);

            hashSum += characterCode;
            hashCharacterCodes[i] = characterCode;
        }

        // A value represented as a percentage that's between the min hash sum and max hash sum.
        const rarityScore = ((hashSum - HASH_SUM_MIN) * 100) / (HASH_SUM_MAX - HASH_SUM_MIN);

        // Default to the first item 
        let [ value ] = attribute.values;
        
        if(attribute.values.length > 0) {
            const valueIndexFromRarityScore = Math.round(attribute.values.length - ((rarityScore / 100) * attribute.values.length));

            // Because 5.5 will round up to 6 which might not be an index.
            const valueIndex = valueIndexFromRarityScore < attribute.values.length ? valueIndexFromRarityScore : valueIndexFromRarityScore - 1;

            value = attribute.values[valueIndex];
        }

        const {
            name   : attributeName = "",
            folder : attributeFolder = "",
        } = attribute;

        const {
            name  : valueName = "",
            file  : valueFile = "",
        } = value;

        const getLastPathSegment = (path) => path.split("/").reverse()[0];
        const cleanPathSlashes = (str) => str.replace(/\/$/, "");
        const buildValueFilePath = (folder, file) => `./${cleanPathSlashes(folder)}/${cleanPathSlashes(file)}.png`;

        const result = {
            attribute : "",
            value     : {},
        };

        // Determine attribute name
        result.attribute = attributeName ? attributeName : getLastPathSegment(attributeFolder);
        
        // Determine value name
        result.value.file = valueName ?
            buildValueFilePath(attributeFolder, valueName) :
            buildValueFilePath(attributeFolder, getLastPathSegment(valueFile));

        result.value.name = valueName ? valueName : getLastPathSegment(valueFile);

        result.attribute = result.attribute.replaceAll("_", " ");
        result.value.name = result.value.name.replaceAll("_", " ");

        return result;
    });

    const metadata = generate();

    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");

    for(let i = 0; i < metadata.length; i++) {
        const image = new Image();
        
        image.crossOrigin="anonymous"

        const waitForLoad = new Promise((resolve, reject) => {
            image.onload = resolve;
        });

        image.src = metadata[i].value.file;
        
        await waitForLoad;
    
        canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

        window.$fxhashFeatures[metadata[i].attribute] = metadata[i].value.name;
    }
    
    const cavasImgSrc = canvas.toDataURL("image/png");
    
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", cavasImgSrc);
    imageEl.classList.add("generated");
    
    document.body.appendChild(imageEl);

    fxpreview();

    console.log(JSON.stringify({
        input : fxhash,
        output : metadata,
        $fxhashFeatures : window.$fxhashFeatures,
    }, null, 4));
})();