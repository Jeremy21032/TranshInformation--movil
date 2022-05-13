
export const validateEmail = (ValueEmail) => {
    let Response = {
      Result: null,
      message: null,
    };
    let ExpresionValidate = /^\w+[-_\.0-9]?(\w+)?@\w+\.\w+\.?(\w+)?$/gim;
    let ResultValidate = ExpresionValidate.test(ValueEmail);
    if (ResultValidate) {
      let TempResult = validateEmailDomains(ValueEmail);
      return TempResult;
    } else {
      Response.Result = false;
      Response.message = "Ingrese un email correcto";
      return Response;
    }
  };
  
  const validateEmailDomains = (ValueEmail) => {
    let Response = {
      Result: null,
      message: null,
    };
    let EmailSplit = ValueEmail.split("@");
    EmailSplit = EmailSplit[1];
    let domainsArray = EmailSplit.split(".");
    const tempArrayDuplicate = [];
    for (let i = 0; i < domainsArray.length; i++) {
      if (domainsArray[i + 1] === domainsArray[i]) {
        tempArrayDuplicate.push(domainsArray[i]);
      }
    }
    if (tempArrayDuplicate.length === 0) {
      Response.Result = true;
      Response.message = "Email Correcto";
      return Response;
    } else {
      //alert('Ingrese un email correcto')
      Response.Result = false;
      Response.message = "Ingrese un email correcto";
      return Response;
    }
  };
  