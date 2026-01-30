import { DataTypes, Model, Optional } from 'sequelize'
import database from '@config/database'

interface ExampleAttributes {
  id: number
  name: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ExampleCreationAttributes
  extends Optional<ExampleAttributes, 'id' | 'description' | 'createdAt' | 'updatedAt'> {}

class Example extends Model<ExampleAttributes, ExampleCreationAttributes> implements ExampleAttributes {
  public id!: number
  public name!: string
  public description?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Example.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    sequelize: database,
    tableName: 'examples',
    timestamps: true
  }
)

export default Example
