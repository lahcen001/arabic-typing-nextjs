#!/bin/bash

# MongoDB Setup Script for Arabic Typing App
# This script helps set up MongoDB for the backup system

echo "🚀 Setting up MongoDB for Arabic Typing App Backup System"
echo "========================================================="

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "Detected OS: ${MACHINE}"

# Function to install MongoDB on macOS
install_mongodb_mac() {
    echo "📦 Installing MongoDB on macOS..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew is not installed. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    
    # Install MongoDB
    echo "Installing MongoDB Community Edition..."
    brew tap mongodb/brew
    brew install mongodb-community
    
    # Start MongoDB service
    echo "Starting MongoDB service..."
    brew services start mongodb-community
    
    echo "✅ MongoDB installed and started successfully!"
}

# Function to install MongoDB on Linux
install_mongodb_linux() {
    echo "📦 Installing MongoDB on Linux..."
    
    # Detect Linux distribution
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
    else
        echo "❌ Cannot detect Linux distribution"
        exit 1
    fi
    
    case $DISTRO in
        ubuntu|debian)
            echo "Installing MongoDB on Ubuntu/Debian..."
            sudo apt-get update
            sudo apt-get install -y mongodb
            sudo systemctl start mongodb
            sudo systemctl enable mongodb
            ;;
        centos|rhel|fedora)
            echo "Installing MongoDB on CentOS/RHEL/Fedora..."
            sudo yum install -y mongodb-server
            sudo systemctl start mongod
            sudo systemctl enable mongod
            ;;
        *)
            echo "❌ Unsupported Linux distribution: $DISTRO"
            echo "Please install MongoDB manually: https://docs.mongodb.com/manual/installation/"
            exit 1
            ;;
    esac
    
    echo "✅ MongoDB installed and started successfully!"
}

# Function to create environment file
create_env_file() {
    echo "📝 Creating environment configuration..."
    
    ENV_FILE=".env.local"
    
    if [ -f "$ENV_FILE" ]; then
        echo "⚠️  $ENV_FILE already exists. Creating backup..."
        cp "$ENV_FILE" "$ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    cat > "$ENV_FILE" << EOF
# MongoDB Configuration for Arabic Typing App Backup System
MONGODB_URI=mongodb://localhost:27017/arabizi-backup

# Alternative MongoDB Atlas connection (uncomment and replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arabizi-backup?retryWrites=true&w=majority

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    
    echo "✅ Environment file created: $ENV_FILE"
}

# Function to test MongoDB connection
test_mongodb_connection() {
    echo "🔍 Testing MongoDB connection..."
    
    # Try to connect to MongoDB
    if command -v mongosh &> /dev/null; then
        # Use mongosh (new MongoDB shell)
        mongosh --eval "db.adminCommand('ismaster')" --quiet > /dev/null 2>&1
    elif command -v mongo &> /dev/null; then
        # Use legacy mongo shell
        mongo --eval "db.adminCommand('ismaster')" --quiet > /dev/null 2>&1
    else
        echo "❌ MongoDB shell not found. Please install MongoDB shell."
        return 1
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB connection successful!"
        return 0
    else
        echo "❌ MongoDB connection failed!"
        return 1
    fi
}

# Function to create initial database and collection
setup_database() {
    echo "🗄️  Setting up database and collections..."
    
    if command -v mongosh &> /dev/null; then
        MONGO_CMD="mongosh"
    elif command -v mongo &> /dev/null; then
        MONGO_CMD="mongo"
    else
        echo "❌ MongoDB shell not found"
        return 1
    fi
    
    $MONGO_CMD arabizi-backup --eval "
        db.translations.createIndex({ 'latinWord': 1 }, { unique: true });
        db.translations.createIndex({ 'frequency': -1 });
        db.translations.createIndex({ 'lastUsed': -1 });
        print('✅ Database indexes created successfully!');
    " --quiet
}

# Main installation process
main() {
    echo "Choose installation option:"
    echo "1) Install MongoDB locally"
    echo "2) Use MongoDB Atlas (cloud)"
    echo "3) Skip MongoDB installation (already installed)"
    echo "4) Exit"
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            case $MACHINE in
                Mac)
                    install_mongodb_mac
                    ;;
                Linux)
                    install_mongodb_linux
                    ;;
                *)
                    echo "❌ Automatic installation not supported for $MACHINE"
                    echo "Please install MongoDB manually: https://docs.mongodb.com/manual/installation/"
                    exit 1
                    ;;
            esac
            
            # Test connection
            sleep 3  # Wait for MongoDB to start
            if test_mongodb_connection; then
                setup_database
                create_env_file
            else
                echo "❌ MongoDB setup failed. Please check the installation."
                exit 1
            fi
            ;;
        2)
            echo "📡 Setting up MongoDB Atlas..."
            echo "1. Go to https://www.mongodb.com/atlas"
            echo "2. Create a free account and cluster"
            echo "3. Get your connection string"
            echo "4. Replace the MONGODB_URI in .env.local"
            create_env_file
            echo "⚠️  Don't forget to update MONGODB_URI with your Atlas connection string!"
            ;;
        3)
            echo "⏭️  Skipping MongoDB installation..."
            if test_mongodb_connection; then
                setup_database
                create_env_file
            else
                echo "❌ Cannot connect to MongoDB. Please check your installation."
                exit 1
            fi
            ;;
        4)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start your Next.js app: npm run dev"
    echo "2. Test the transliteration API"
    echo "3. Check backup functionality with: curl 'http://localhost:3000/api/backup?action=stats'"
    echo ""
    echo "📚 For more information, see MONGODB_BACKUP_README.md"
}

# Run main function
main 