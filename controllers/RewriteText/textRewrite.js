import { runGroqQuery } from '../../helpers/grokIntegration.js';
import { 
  successResponse, 
  badRequestResponse, 
  serverErrorResponse 
} from '../../helpers/apiResponses.js';



const normalTextRewrite = async (req, res) => {
  try {

    const { message } = req.body;
    
    if (!message) {
        return badRequestResponse(res, "All fields are mandatory", null);
    }
    
    const rewrittenText = await runGroqQuery(message, 'Normal');

    if( rewrittenText) {

        return successResponse(res, 'Text written in Normal tone', rewrittenText);
    }
    else {

        return serverErrorResponse(res, 'Failed to rewrite text in Normal tone');
    }
   

  } catch (error) {
    
    return serverErrorResponse(res, "Internal server error. Please try again later!");
  }
};

const fluentTextRewrite = async (req, res) => {
    try {
  
      const { message } = req.body;
      
      if (!message) {
          return badRequestResponse(res, "All fields are mandatory", null);
      }
      
      const rewrittenText = await runGroqQuery(message, 'Fluent');
  
      if( rewrittenText) {
  
          return successResponse(res, 'Text written in Fluent tone', rewrittenText);
      }
      else {
  
          return serverErrorResponse(res, 'Failed to rewrite text in Fluent tone');
      }
     
  
    } catch (error) {
      
      return serverErrorResponse(res, "Internal server error. Please try again later");
    }
  };

  const formalTextRewrite = async (req, res) => {
    try {
  
      const { message } = req.body;
      
      if (!message) {
          return badRequestResponse(res, "All fields are mandatory", null);
      }
      
      const rewrittenText = await runGroqQuery(message, 'Formal');
  
      if( rewrittenText) {
  
          return successResponse(res, 'Text written in Formal tone', rewrittenText);
      }
      else {
  
          return serverErrorResponse(res, 'Failed to rewrite text in Formal tone');
      }
     
  
    } catch (error) {
      
      return serverErrorResponse(res, "Internal server error. Please try again later");
    }
  };  

  const innovativeTextRewrite = async (req, res) => {
    try {
  
      const { message } = req.body;
      
      if (!message) {
          return badRequestResponse(res, "All fields are mandatory", null);
      }
      
      const rewrittenText = await runGroqQuery(message, 'Innovative');
  
      if( rewrittenText) {
  
          return successResponse(res, 'Text written in Innovative tone', rewrittenText);
      }
      else {
  
          return serverErrorResponse(res, 'Failed to rewrite text in Innovative tone');
      }
     
  
    } catch (error) {
      
      return serverErrorResponse(res, "Internal server error. Please try again later");
    }
  };

  
  const coherentTextRewrite = async (req, res) => {
    try {
  
      const { message } = req.body;
      
      if (!message) {
          return badRequestResponse(res, "All fields are mandatory", null);
      }
      
      const rewrittenText = await runGroqQuery(message, 'Coherent');
  
      if( rewrittenText) {
  
          return successResponse(res, 'Text written in Coherent tone', rewrittenText);
      }
      else {
  
          return serverErrorResponse(res, 'Failed to rewrite text in Coherent tone');
      }
     
  
    } catch (error) {
      
      return serverErrorResponse(res, "Internal server error. Please try again later");
    }
  };

  const academicTextRewrite = async (req, res) => {
    try {
  
      const { message } = req.body;
      
      if (!message) {
          return badRequestResponse(res, "All fields are mandatory", null);
      }
      
      const rewrittenText = await runGroqQuery(message, 'Academic');
  
      if( rewrittenText) {
  
          return successResponse(res, 'Text written in Academic tone', rewrittenText);
      }
      else {
  // How
          return serverErrorResponse(res, 'Failed to rewrite text in Academic tone');
      }
     
  
    } catch (error) {
      
      return serverErrorResponse(res, "Internal server error. Please try again later");
    }
  };

export {
  normalTextRewrite,
  fluentTextRewrite,
  formalTextRewrite,
  innovativeTextRewrite,
  coherentTextRewrite,
  academicTextRewrite

}