module.exports = {

  watch: function (req, res) {
    req._choreo.models.pet.watch(req);
    res.send(200);
  }

};
