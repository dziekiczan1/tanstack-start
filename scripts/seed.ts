// scripts/seed.ts

// 1️⃣ Load environment variables as the very first thing
import 'dotenv/config'

// 2️⃣ Prevent Nitro/Vite from initializing when running as a standalone script
process.env.NITRO_PRESET = 'node-server'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// 3️⃣ Import other modules AFTER dotenv is loaded
import { sampleProducts } from '../src/data/products'

async function seed() {
  try {
    // Dynamically import database modules after environment variables are loaded
    const { db } = await import('../src/db/index')
    const { products } = await import('../src/db/schema')

    console.log('🌱 Starting database seed...')

    // Check if --reset flag is passed
    const shouldReset =
      process.argv.includes('--reset') || process.argv.includes('-r')

    if (shouldReset) {
      console.log('🗑️  Clearing existing products...')
      await db.delete(products)
      console.log('   Cleared all products')
    } else {
      // Check if products already exist
      const existingProducts = await db.select().from(products).limit(1)

      if (existingProducts.length > 0) {
        console.log('⚠️  Products already exist in the database.')
        console.log(
          '   Run with --reset flag to clear and reseed: npm run db:seed -- --reset',
        )
        process.exit(0)
      }
    }

    // Insert sample products
    console.log(`📦 Inserting ${sampleProducts.length} products...`)
    await db.insert(products).values(sampleProducts)

    console.log('✅ Database seeded successfully!')
    console.log(`   Inserted ${sampleProducts.length} products`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Only run seed() if this file is executed directly
const isRunningAsScript =
  process.argv[1]?.includes('seed.ts') || process.argv[1]?.includes('tsx')

if (isRunningAsScript) {
  seed()
}
