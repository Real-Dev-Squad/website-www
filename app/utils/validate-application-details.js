/**
 * Generate application details
 * ---
 * @param {Object} applicationDetails
 * @param {string} applicationDetails.id
 * @param {Object} applicationDetails.intro
 * @param {string} applicationDetails.intro.funFact
 * @param {string} applicationDetails.intro.forFun
 * @param {number} applicationDetails.intro.numberOfHours
 * @param {string} applicationDetails.intro.whyRds
 * @param {string} applicationDetails.intro.introduction
 * @param {Object} applicationDetails.biodata
 * @param {string} applicationDetails.biodata.firstName
 * @param {string} applicationDetails.biodata.lastName
 * @param {Object} applicationDetails.location
 * @param {string} applicationDetails.location.country
 * @param {string} applicationDetails.location.city
 * @param {string} applicationDetails.location.state
 * @param {string} applicationDetails.foundFrom
 * @param {string} applicationDetails.userId
 * @param {Object} applicationDetails.professional
 * @param {string} applicationDetails.professional.skills
 * @param {string} applicationDetails.professional.institution
 * @param {string} applicationDetails.status - "accepted" | "rejected" | "pending"
 *
 * @returns {Object} validateApplicationDetails
 * @returns {boolean} validateApplicationDetails.isValid
 * @returns {applicationDetails} validateApplicationDetails.data
 */
export const validateApplicationDetails = (applicationDetails) => {
  if (!applicationDetails || !applicationDetails.userId) {
    return { isValid: false, data: null };
  }

  return { isValid: true, data: applicationDetails };
};
