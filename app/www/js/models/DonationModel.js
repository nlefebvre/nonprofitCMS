var Donation = BaseModel.extend({
  urlRoot: "/api/donation",
  defaults: {
    accountNumber: null,
    payee: null,
    taxItem: "No Tax Item",
    amount: null,
    description: null
  }
});
