const { appointment, slot } = Model;
const nexmo = require('nexmo');

const appointmentController = {
    all(req,res){
        appointment.find({}).exec((err, appointments) => res.json(ppointments));
    },
    create(req,res){
        var requestBody = req.body;
        var newSlot = new Slot({
            slot_time: requestBody.slot_time,
            slot_date: requestBody.slot_date,
            created_at: Date.now()
    
        });
        newSlot.save();
        var newappointment = new Appointment({
            name: requestBody.name,
            email: requestBody.email,
            phone: requestBody.phone,
            slots: newslot._id
          });

          const nexmo = new Nexmo({
            apiKey: "a2e322c5",
            apiSecret: "a3dfd4bd8d9a52c9"
          });
          let msg =
                requestBody.name +
                " " +
                "this message is to confirm your appointment at" +
                " " +
                requestBody.appointment;

        newappointment.save((err, saved) => {
            // Returns the saved appointment
            // after a successful save
            Appointment.find({ _id: saved._id })
                .populate("slots")
                .exec((err, appointment) => res.json(appointment));

                const from = VIRTUAL_NUMBER;
                const to = RECIPIENT_NUMBER;

                nexmo.message.sendSms(from, to, msg, (err, responseData) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.dir(responseData);
                    }
                  });
                });
    }
}

module.exports = appointmentController;