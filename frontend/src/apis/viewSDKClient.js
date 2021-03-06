const clientId = process.env.REACT_APP_PDF_EMBED_KEY

const viewSDKClient = {
  readyPromise: new Promise(resolve => {
    if (window.AdobeDC) resolve()
    else {
      /* Wait for Adobe Document Services PDF Embed API to be ready */
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        resolve()
      })
    }
  }),

  adobeDCView: undefined,

  ready: function () { return this.readyPromise },

  previewFile: async function ({ viewerConfig, fileName, fileUrl, pageNumber }) {
    const config = {
      /* Pass your registered client id */
      clientId: clientId,
    }

    /* Optional only for Light Box embed mode */
    // if (divId) { 
      /* Pass the div id in which PDF should be rendered */
      // config.divId = divId;
    // }

    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View(config)

    /* Invoke the file preview API on Adobe DC View object */
    const previewFilePromise = await this.adobeDCView.previewFile({
      /* Pass information on how to access the file */
      content: {
        /* Location of file where it is hosted */
        location: {
          url: fileUrl,
          /*
          If the file URL requires some additional headers, then it can be passed as follows:-
          headers: [
              {
                  key: "<HEADER_KEY>",
                  value: "<HEADER_VALUE>",
              }
          ]
          */
        },
      },
      /* Pass meta data of file */
      metaData: {
        /* file name */
        fileName: fileName,
        /* file ID (optional) */
        // id: fileId,
      }
    }, viewerConfig)

    // Open PDF on the specified page number
    const apis = await previewFilePromise.getAPIs()
    await apis.gotoLocation(pageNumber)
  },

  previewFileUsingFilePromise: function (divId, filePromise, fileName) {
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View({
      /* Pass your registered client id */
      clientId: "8c0cd670273d451cbc9b351b11d22318",
      /* Pass the div id in which PDF should be rendered */
      divId,
    })

    /* Invoke the file preview API on Adobe DC View object */
    this.adobeDCView.previewFile({
      /* Pass information on how to access the file */
      content: {
        /* pass file promise which resolve to arrayBuffer */
        promise: filePromise,
      },
      /* Pass meta data of file */
      metaData: {
        /* file name */
        fileName: fileName
      }
    }, {})
  },

  registerSaveApiHandler: function () {
    /* Define Save API Handler */
    const saveApiHandler = (metaData, content, options) => {
      console.log(metaData, content, options)

      return new Promise(resolve => {
        /* Dummy implementation of Save API, replace with your business logic */
        setTimeout(() => {
          const response = {
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              metaData: Object.assign(metaData, { updatedAt: new Date().getTime() })
            },
          }
          resolve(response);
        }, 2000)
      })
    }

    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      saveApiHandler,
      {}
    )
  },

  registerEventsHandler: function () {
    /* Register the callback to receive the events */
    this.adobeDCView.registerCallback(
      /* Type of call back */
      window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      /* call back function */
      event => {
        console.log(event);
      },
      /* options to control the callback execution */
      {
        /* Enable PDF analytics events on user interaction. */
        enablePDFAnalytics: true,
      }
    )
  }
}

// Open PDF using Adobe PDF Embed API
export const openFile = async (title, fileUrl, pageNumber = 1) => {
  await viewSDKClient.ready()

  viewSDKClient.previewFile({ 
    fileName: `${title}.pdf`, 
    fileUrl, 
    pageNumber,
    viewerConfig: { embedMode: 'LIGHT_BOX' }
  })
}