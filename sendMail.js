const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "team.metapowerbuilding@gmail.com",
    pass: "egzr tsdp fpoi zqwb",
  },
});

var password = generatePassword();

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <team@metapowerbuilding.com>', // sender address
    to: "perreault_elliot@emm.qc.ca, maheuxm6@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: `<b>Here is your random generated password: ${password}</b><button>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

function generatePassword() {
  //code qui genere un mdp
  return "akjsdhhbasdj";
}
