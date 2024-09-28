class Const {
  
  static Success200 = 200;
  static Invalid400 = 400;
  static UnAuth401 = 401;
  static Unknown404 = 404;
  static ServerError500 = 500;

  // Roles
  static RoleAssociate = 1;
  static RoleSuperadmin = 2;
  static RoleOrganization = 3;
  static RoleAdmin = 4;
  static RoleParent = 5;
  static RoleCounsellor = 6;
  static RoleUser = 7;



  static Auth = "auth";
  static authToken = "wdxbXcuJgHfuXxbQ";

  static Active = 1;
  static Deactive = 2;
  static Draft = 3;
  static Trash = 4;

  static Domain = "http://localhost:3000/";
  

  static OtpUrl = 'https://enterprise.smsgupshup.com/GatewayAPI/rest?';
  static OTPUser = "2000199903";
  static OTPPassword = "NuF@5KeQ";
      
  static Response = (status, body, msg) => {
    return { status, body: body ? body : { message : msg } };
  }
  
  static DateFormat = (exam_date) => {
    // Parse the input string into a Date object
    const inputDate = new Date(exam_date);
    // Format the date as 'YYYY-MM-DD HH:mm:ss'
    const year = inputDate.getUTCFullYear();
    const month = ('0' + (inputDate.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getUTCDate()).slice(-2);
    const hour = ('0' + inputDate.getUTCHours()).slice(-2);
    const minute = ('0' + inputDate.getUTCMinutes()).slice(-2);
    const second = ('0' + inputDate.getUTCSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  static CreatedBy = 'created_by';
  static UpdatedBy = 'updated_by';
  static CreatedDate = 'created_date';
  static UpdatedDate = 'updated_date';

  static PublicKey = "./src/config/public.pem";
  static PrivateKey = "./src/config/private.pem";

  static limit = 15;
}

module.exports = Const;