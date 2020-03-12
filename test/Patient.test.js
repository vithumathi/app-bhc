// Import smart contract for testing
const Patient = artifacts.require("Patient");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Patient", accounts => {
  let patient;

  // run before each test case
  before( async () => {
    patient = await Patient.deployed()
  })
  // tests
  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = patient.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('storage', async () => {
      it('updates the patient file hash', async () =>{
        let fileHash
        fileHash = 'abc123'
        await patient.set(fileHash)
        const result = await patient.get()
        assert.equal(result, fileHash)
      })
  })
})
