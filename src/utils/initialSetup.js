import Role from '../models/Role.js'

// Create predefined info when starting the application
export const initialSetup = async () => {
  try {
    const rolesCount = await Role.estimatedDocumentCount()
    if (rolesCount === 0) {
      await Promise.all([
        new Role({ name: 'admin' }).save(),
        new Role({ name: 'standard' }).save()
      ])
    }
  } catch (error) {
    console.error(error)
  }
}
